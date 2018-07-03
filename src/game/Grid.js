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
    };

    static defaultProps = {
        readOnly: true,
    };

    render() {
        const { grid, readOnly, onPress, winningLine } = this.props;

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
                                        onPress={onPress}
                                        winningBox={
                                            winningLine.indexOf(boxValue) >= 0
                                        }
                                    />
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }
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
