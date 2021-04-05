<template>
	<v-container>
		<v-row>
			<v-col
				v-for="card in cards"
				:key="card.name"
				cols="3.5"
			>
				<v-card
					height="200"
					width="200"
					elevation="6"
				>
					<v-img :src="require(`@/assets/images/cards/${card.file}`)" />
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'CardListView',
	data: () => ({}),
	computed: mapState({
		cards: state => state.cards,
	}),
}
</script>
