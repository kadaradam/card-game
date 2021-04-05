import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Credit goes to: https://github.com/coolaj86/knuth-shuffle

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export default new Vuex.Store({
	state: {
		settings: {
			deckSize: 10,
		},
		isGameActive: false,
		cardAssets: [
			{
				name: 'Angular',
				file: 'angular.png'
			},
			{
				name: 'D3',
				file: 'd3.png'
			},
			{
				name: 'Jenkins',
				file: 'jenkins.png'
			},
			{
				name: 'PostCSS',
				file: 'postcss.png'
			},
			{
				name: 'React',
				file: 'react.png'
			},
			{
				name: 'Redux',
				file: 'redux.png'
			},
			{
				name: 'SASS',
				file: 'sass.png'
			},
			{
				name: 'Splendex',
				file: 'splendex.png'
			},
			{
				name: 'TS',
				file: 'ts.png'
			},
			{
				name: 'webpack',
				file: 'webpack.png'
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
		},
		SET_CARD_STATE(state, { index, cardState }) {
			Vue.set(state.cards[index], 'isCardFlipped', cardState);
		}
	},
	actions: {
		startNewGame({ state, commit }) {
			const copyAssets = JSON.parse(JSON.stringify(state.cardAssets));
			const copyAssetsPack2 = JSON.parse(JSON.stringify(state.cardAssets));

			// 1. Double the card size, by copying the default card 
			// 2. Shuffle the cards
			// 3. Assign a new `isCardFlipped` property
			const shuffledArray = shuffle([
				...copyAssets,
				...copyAssetsPack2,
			]).map(card => ({ ...card, isCardFlipped: false }));

			commit('SET_GAME_CARDS', shuffledArray);

			commit('SET_GAME_ACTIVE', true);
		},
		setCardState({ commit }, param) {
			commit('SET_CARD_STATE', param);
		}
	},
});