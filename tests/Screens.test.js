import React from 'react';
import HomeScreen from '../src/home/HomeScreen';
import GameScreen from '../src/game/GameScreen';
import GameListScreen from '../src/gameList/GameListScreen';
import { newEmptyGame } from '../src/services/GameService';

import renderer from 'react-test-renderer';

describe('Screens tests', () => {
    it('renders home without crashing', () => {
        const rendered = renderer.create(<HomeScreen />).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('renders an empty game without crashing', () => {
        const navigation = { navigate: jest.fn() };
        expect(
            renderer.create(<GameScreen navigation={navigation} />),
        ).toBeTruthy();
    });

    it('renders a game without crashing', () => {
        const game = newEmptyGame();
        game.idGame = 1;
        const navigation = {
            navigate: jest.fn(),
            state: {
                params: {
                    game: game,
                },
            },
        };
        expect(
            renderer.create(<GameScreen navigation={navigation} />),
        ).toBeTruthy();
    });

    it('renders an empty game list without crashing', () => {
        const navigation = {
            navigate: jest.fn(),
            state: {
                params: {
                    listType: 'current"',
                },
            },
        };
        expect(
            renderer.create(<GameListScreen navigation={navigation} />),
        ).toBeTruthy();
    });
});
