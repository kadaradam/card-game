import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		settings: {
			deckSize: 10,
		},
		isGameActive: false,
		cardAssets: [
			{
				name: "Angular",
				file: "angular.png"
			},
			{
				name: "D3",
				file: "d3.png"
			},
			{
				name: "Jenkins",
				file: "jenkins.png"
			},
			{
				name: "PostCSS",
				file: "postcss.png"
			},
			{
				name: "React",
				file: "react.png"
			},
			{
				name: "Redux",
				file: "redux.png"
			},
			{
				name: "SASS",
				file: "sass.png"
			},
			{
				name: "Splendex",
				file: "splendex.png"
			},
			{
				name: "TS",
				file: "ts.png"
			},
			{
				name: "webpack",
				file: "webpack.png"
			},
		],
		cards: [],
	},
	getters: {

	},
	mutations: {
		SET_GAME_CARDS(state, cardArray) {
			state.cards = cardArray;
		},
		SET_GAME_ACTIVE(state, value) {
			state.isGameActive = value;
		}	
	},
	actions: {
		startNewGame({ state, commit }) {
			const copyAssets = JSON.parse(JSON.stringify(state.cardAssets));

			// Double the card size
			commit("SET_GAME_CARDS", [
				...copyAssets,
				...copyAssets,
			]);

			commit("SET_GAME_ACTIVE", true);
		}
	},
});