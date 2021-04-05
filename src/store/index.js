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
		isGameFinished: false,
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
		flippedCards: [],
		currentTries: 0,
		bestScore: 0,

		canPlayerFlip: true, // For flip cooldown
	},
	getters: {
		getCurrentDeckSize(state) {
			return state.settings.deckSize;
		},
		getCurrentGameData({ cards, flippedCards, currentTries, settings }) {
			return {
				cards,
				flippedCards,
				currentTries,
				settings,
			};
		},
	},
	mutations: {
		SET_GAME_CARDS(state, cardArray) {
			state.cards = cardArray;
		},
		SET_FLIPPED_CARDS(state, cardArray) {
			state.flippedCards = cardArray;
		},
		SET_GAME_ACTIVE(state, value) {
			state.isGameActive = value;
		},
		SET_GAME_FINISHED(state, value) {
			state.isGameFinished = value;
		},
		SET_CARD_STATE(state, { index, stateName, value }) {
			const cardStates = {
				'flipped': 'isCardFlipped',
				'found': 'isCardFound',
			};

			Vue.set(state.cards[index], cardStates[stateName], value);
		},
		SET_SETTINGS(state, { name, value }) {
			Vue.set(state.settings, name, value);
		},
		RESET_FLIPPED_CARD(state) {
			state.flippedCards = [];
		},
		ADD_FLIPPED_CARD(state, card) {
			if (state.flippedCards.length >= 2) {
				return;
			}

			state.flippedCards.push(card);
		},
		SET_CURRENT_SCORE(state, scoreValue) {
			state.currentTries = scoreValue;
		},
		SET_BEST_SCORE(state, scoreValue) {
			state.bestScore = scoreValue;
		},
		SET_CAN_FLIP(state, value) {
			state.canPlayerFlip = value;
		}
	},
	actions: {
		startNewGame({ state, commit }, { deckSize }) {
			const cardDeck = shuffle(state.cardAssets).slice(0, deckSize);
			const copyAssets = JSON.parse(JSON.stringify(cardDeck));
			const copyAssetsPack2 = JSON.parse(JSON.stringify(cardDeck));

			// 1. Double the card size by copying the default card 
			// 2. Shuffle the cards
			// 3. Assign a new `isCardFlipped` property
			const shuffledArray = shuffle([
				...copyAssets,
				...copyAssetsPack2,
			]).map(card => ({
				...card,
				isCardFlipped: false,
				isCardFound: false,
			}));

			commit('SET_GAME_CARDS', shuffledArray);

			commit('SET_GAME_ACTIVE', true);
			commit('SET_GAME_FINISHED', false);
			commit('RESET_FLIPPED_CARD');

			commit('SET_SETTINGS', { name: 'deckSize', value: deckSize });
			commit('SET_CURRENT_SCORE', 0);
		},
		loadPreviousGame({ commit }, {
			cards,
			flippedCards,
			currentTries,
			settings,
		}) {
			commit('SET_GAME_CARDS', cards);
			commit('SET_FLIPPED_CARDS', flippedCards);
			commit('SET_CURRENT_SCORE', currentTries);

			commit('SET_GAME_ACTIVE', true);
			commit('SET_GAME_FINISHED', false);

			Object.keys(settings).forEach(key => commit('SET_SETTINGS', { name: key, value: settings[key] }));
		},
		setCardState({ commit }, param) {
			commit('SET_CARD_STATE', param);
		},
		flipCard({ commit, state }, { index }) {
			if (state.flippedCards.length > 2 || !state.canPlayerFlip) {
				return;
			}

			// Do not allow to flip multiple cards at one
			commit('ADD_FLIPPED_CARD', state.cards[index]);

			commit('SET_CAN_FLIP', false);
			commit('SET_CARD_STATE', { index, stateName: 'flipped', value: true });
			
			setTimeout(() => {
				const flippedCardName = state.cards[index].name;
				const shouldCheckForMatch = state.flippedCards.length >= 2;
				const isAMatchingPair = state.flippedCards.every(card => card.name === flippedCardName) || false;

				if (shouldCheckForMatch && !isAMatchingPair) {
					state.cards.forEach((card, arrayIndex) => {
						if (card.isCardFound) {
							return;
						}

						commit('SET_CARD_STATE', { index: arrayIndex, stateName: 'flipped', value: false });
					});

					commit('SET_CURRENT_SCORE', state.currentTries + 1);
				} else if (shouldCheckForMatch && isAMatchingPair) {
					state.cards.forEach((card, arrayIndex) => {
						if (card.name !== flippedCardName) {
							return;
						}

						commit('SET_CARD_STATE', { index: arrayIndex, stateName: 'found', value: true });
					});	
				}

				if (shouldCheckForMatch) {
					commit('RESET_FLIPPED_CARD');
				}

				const isAllCardFound = state.cards.every(cards => cards.isCardFound === true);

				if (isAllCardFound) {
					commit('SET_GAME_ACTIVE', false);
					commit('SET_GAME_FINISHED', true);
				}

				commit('SET_CAN_FLIP', true);
			}, 250);
		}
	},
});