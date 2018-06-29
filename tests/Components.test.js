import React from 'react';
import Grid from '../src/game/Grid';
import RemainingList from '../src/game/RemainingList';
import Box from '../src/game/Box';
import RemainingBox from '../src/game/RemainingBox';
import GridBox from '../src/game/GridBox';
import { newEmptyGame } from '../src/services/GameService';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
} from 'react-testing-library';

import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('Components tests', () => {
    test('Test lib', async () => {
        const game = newEmptyGame();
        // Arrange
        /*  axiosMock.get.mockResolvedValueOnce({
            data: { greeting: 'hello there' },
        });
        const url = '/greeting'; */
        const toto = render(
            <Grid onPress={jest.fn()} grid={game.grid} readOnly={false} />,
        );
        console.debug({ toto });

        // Act
        //fireEvent.click(getByText('Load Greeting'));

        // let's wait for our mocked `get` request promise to resolve
        // wait will wait until the callback doesn't throw an error
        /* const greetingTextNode = await waitForElement(() =>
            getByTestId('greeting-text'),
        ); */

        // Assert
        /*  expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(url);
        expect(getByTestId('greeting-text')).toHaveTextContent('hello there');
        expect(getByTestId('ok-button')).toHaveAttribute('disabled');
        // snapshots work great with regular DOM nodes!
        expect(container.firstChild).toMatchSnapshot(); */
    });

    it('renders grid crashing when no props defined', () => {
        function callback() {
            const rendered = renderer.create(<Grid />).toJSON();
            expect(rendered).toBeFalsy();
        }
        expect(callback).toThrow();
    });
});
