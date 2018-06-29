import React from 'react';
import Grid from '../src/game/Grid';
import RemainingList from '../src/game/RemainingList';
import Box from '../src/game/Box';
import RemainingBox from '../src/game/RemainingBox';
import GridBox from '../src/game/GridBox';

import renderer from 'react-test-renderer';

describe('Components tests', () => {
    it('renders grid crashing when no props defined', () => {
        function callback() {
            const rendered = renderer.create(<Grid />).toJSON();
            expect(rendered).toBeFalsy();
        }
        expect(callback).toThrow();
    });

    it('renders remaining list crashing when no props defined', () => {
        function callback() {
            const rendered = renderer.create(<RemainingList />).toJSON();
            expect(rendered).toBeFalsy();
        }
        expect(callback).toThrow();
    });

    it('renders box crashing when no props defined', () => {
        function callback() {
            const rendered = renderer.create(<Box />).toJSON();
            expect(rendered).toBeFalsy();
        }
        expect(callback).toThrow();
    });

    it('renders remaining box crashing when no props defined', () => {
        function callback() {
            const rendered = renderer.create(<RemainingBox />).toJSON();
            expect(rendered).toBeFalsy();
        }
        expect(callback).toThrow();
    });

    it('renders grid box crashing when no props defined', () => {
        function callback() {
            const rendered = renderer.create(<GridBox />).toJSON();
            expect(rendered).toBeFalsy();
        }
        expect(callback).toThrow();
    });
});
