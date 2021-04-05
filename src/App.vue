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

			<v-row align="center" justify="center" no-gutters>
				<v-col>
					Deck size:
				</v-col>
				<v-col class="mx-4">
					<v-select
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
					>
						Start New Game
					</v-btn>
				</v-col>
			</v-row>

			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main>
			<NewGameView/>
			<CardListView/>
		</v-main>
	</v-app>
</template>

<script>
import CardListView from './components/CardListView';
import NewGameView from './components/NewGameView';

export default {
	name: 'App',
	components: {
		CardListView,
		NewGameView,
	},
	data: () => ({
		availableCardNums: Array(8).fill().map((element, index) => index + 3),
	}),
};
</script>
