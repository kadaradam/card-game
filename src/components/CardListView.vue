<template>
	<v-container>
		<v-row>
			<v-col
				v-for="n in 24"
				:key="n"
				cols="3.5"
			>
				<v-card
					height="200"
					width="200"
					elevation="6"
				>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'CardListView',
		data: () => ({}),
	}
</script>
