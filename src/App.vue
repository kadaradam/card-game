<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
		>
			<div class="d-flex align-center">
				<v-img
					alt="Splendex Logo"
					class="mr-2"
					contain
					src="@/assets/images/splendex-logo.svg"
					transition="scale-transition"
					width="160"
				/>
			</div>

			<v-spacer></v-spacer>

			<v-row
				v-if="isGameActive"
				align="center"
				justify="center"
				no-gutters
			>
				<v-col>
					Deck size:
				</v-col>
				<v-col class="mx-4">
					<v-select
						v-model="deckSize"
						:items="availableCardNums"
						label="Number of cards"
						outlined
						hide-details
					></v-select>
				</v-col>
				<v-col>
					<v-btn
						x-large
						color="red"
						@click="startNewGame({ deckSize })"
					>
						Start New Game
					</v-btn>
				</v-col>
			</v-row>

			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main>
			<template v-if="!isGameActive">
				<NewGameView/>
			</template>
			<template v-else>
				<CardListView/>
			</template>

			<v-dialog
				v-model="loadGameModal"
				transition="dialog-top-transition"
				max-width="600"
			>
				<template v-slot:default="dialog">
				<v-card>
					<v-toolbar
						color="light-green"
						dark
					>
						Previous game session detected
					</v-toolbar>
					<v-card-text class="pt-4 pa-6">
						<div class="text-h6">
							Welcome back!
						</div>
							Do you want to continue with your previous game?
						
					</v-card-text>
					<v-card-actions class="justify-end">
						<v-btn
							depressed
							dark
							color="light-green"
							@click="dialog.value = false, loadPreviousGame(previousGameData)"
						>
							Load previous game
						</v-btn>
						<v-btn
							text
							@click="dialog.value = false"
						>
							Start new game
						</v-btn>
					</v-card-actions>
				</v-card>
				</template>
			</v-dialog>
		</v-main>
	</v-app>
</template>

<script>
import CardListView from './components/CardListView';
import NewGameView from './components/NewGameView';

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
	name: 'App',
	components: {
		CardListView,
		NewGameView,
	},
	data: () => ({
		availableCardNums: Array(8).fill().map((element, index) => index + 3),
		deckSize: 10,
		loadGameModal: false,
		previousGameData: {},
	}),
	computed: {
		...mapState({
			isGameActive: state => state.isGameActive,
		}),
		...mapGetters({
			getCurrentGameData: 'getCurrentGameData'
		})
	},
	methods: mapActions([
		'startNewGame',
		'loadPreviousGame',
	]),
	created() {
		const gameData = window.localStorage.getItem('game-data');

		if (gameData) {
			// Load the previously started game to store module
			const parsedData = JSON.parse(gameData);

			this.loadGameModal = true;
			this.previousGameData = parsedData;

			window.localStorage.removeItem('game-data');
		}

		// Get the actual state of the game when leaving the page
		window.addEventListener('beforeunload', () => {
			if (this.isGameActive) {
				window.localStorage.setItem('game-data', JSON.stringify(this.getCurrentGameData));
			}
		});
	}
};
</script>
