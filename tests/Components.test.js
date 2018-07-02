import React from 'react';
import Grid from '../src/game/Grid';
import { newEmptyGame } from '../src/services/GameService';
import { render, cleanup, fuzzyMatches, matches } from 'react-testing-library';

function queryAllByAccessibilityText(
    container,
    accessibilityLabel,
    { exact = true, collapseWhitespace = true, trim = true } = {},
    element = 'TouchableHighlight',
) {
    const matcher = exact ? matches : fuzzyMatches;
    const matchOpts = { collapseWhitespace, trim };
    return Array.from(container.querySelectorAll(element)).filter(node =>
        matcher(
            node.getAttribute('accessibilitylabel'),
            node,
            accessibilityLabel,
            matchOpts,
        ),
    );
}

afterEach(cleanup);

describe('Components tests', () => {
    test('Test lib', async () => {
        const game = newEmptyGame();

        const { container } = render(
            <Grid onPress={jest.fn()} grid={game.grid} readOnly={false} />,
        );

        const boxes = queryAllByAccessibilityText(container, 'gridbox', {
            exact: false,
        });
        expect(boxes).toHaveLength(16);
    });
});
