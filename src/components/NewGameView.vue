<template>
	<v-container>
		<v-row class="text-center">
			<v-col>
				<h1 :class="['display-2', 'font-weight-bold', 'mb-3',  { 'green--text': isGameFinished } ]">
					{{ isGameFinished ? `Congratulations! You finished the game with ${currentTries} tries.` : `Memory Game`}}
				</h1>
			
				<v-select
					v-model="deckSize"
					:items="availableCardNums"
					label="Number of cards"
					outlined
					hide-details
				></v-select>

				<v-btn
					x-large
					color="red"
					dark
					@click="startNewGame({ deckSize })"
					class="mt-4"
				>
					Start New Game
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'NewGameView',
	data: () => ({
		availableCardNums: Array(8).fill().map((element, index) => index + 3),
		deckSize: 10,
	}),
	methods: mapActions([
		'startNewGame',
	]),
	computed: mapState({
		currentTries: state => state.currentTries,
		isGameFinished: state => state.isGameFinished,
	}),
};
</script>
