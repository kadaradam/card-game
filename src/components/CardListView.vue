<template>
	<v-container>
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
import { mapState, mapActions } from 'vuex';

export default {
	name: 'CardListView',
	data: () => ({}),
	computed: mapState({
		cards: state => state.cards,
	}),
	methods: mapActions([
		'flipCard',
	]),
};
</script>
