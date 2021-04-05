<template>
	<v-container>
		<v-row align="center" justify="space-around">
			<v-col>
				Current tries: {{ currentTries}}
			</v-col>
			<v-col class="text-center">
				<!-- Best: {{ bestScore }} -->
			</v-col>
			<v-col class="text-right">
				<v-btn
					class="ma-2"
					outlined
					@click="startNewGame({ deckSize: getCurrentDeckSize })"
				>
					Reset Game ({{getCurrentDeckSize}})
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col
				v-for="(card, index) in cards"
				:key="index"
				cols="3.5"
			>
				<v-card
					height="200"
					width="200"
					elevation="6"
					@click="flipCard({ index })"
				>
					<v-img v-if="card.isCardFlipped" :src="require(`@/assets/images/cards/${card.file}`)" />
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
	name: 'CardListView',
	data: () => ({}),
	computed: {
		...mapState({
			cards: state => state.cards,
			currentTries: state => state.currentTries,
			bestScore: state => state.bestScore,
		}),
		...mapGetters({
			getCurrentDeckSize: 'getCurrentDeckSize'
		})
	},
	methods: mapActions([
		'flipCard',
		'startNewGame',
	]),
};
</script>
