<template>
	<v-container>
		<v-row class="text-center">
			<v-col>
				<h1 class="display-2 font-weight-bold mb-3">
					Splendex Memory Game
				</h1>
			
				<v-select
					:items="availableCardNums"
					label="Number of cards"
					outlined
					hide-details
				></v-select>

				<v-btn
					x-large
					color="red"
					dark
				>
					Start New Game
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'NewGameView',
		data: () => ({
			availableCardNums: Array(8).fill().map((element, index) => index + 3),
		}),
	}
</script>
