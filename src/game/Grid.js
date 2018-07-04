import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import GridBox from './GridBox';

export default class Grid extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        grid: PropTypes.array.isRequired,
        winningLine: PropTypes.array.isRequired,
        readOnly: PropTypes.bool,
        goodPlaces: PropTypes.array.isRequired,
        activeZone: PropTypes.bool,
    };

    static defaultProps = {
        readOnly: true,
    };

    render() {
        const {
            grid,
            readOnly,
            onPress,
            winningLine,
            goodPlaces,
            activeZone,
        } = this.props;

        return (
            <View style={styles.column}>
                {grid.map((row, rowKey) => {
                    return (
                        <View style={styles.row} key={rowKey}>
                            {row.map((boxValue, boxKey) => {
                                return (
                                    <GridBox
                                        key={boxKey}
                                        boxValue={String(boxValue)}
                                        x={boxKey}
                                        y={rowKey}
                                        enabled={!readOnly}
                                        clickable={!readOnly && activeZone}
                                        onPress={onPress}
                                        winningBox={
                                            winningLine.indexOf(boxValue) >= 0
                                        }
                                        goodPlace={this.positionInclude(
                                            goodPlaces,
                                            boxKey,
                                            rowKey,
                                        )}
                                    />
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }

    positionInclude = (placesList, x, y) => {
        return placesList.some(place => {
            return place[0] == y && place[1] == x;
        });
    };
}

const styles = StyleSheet.create({
    column: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
});
