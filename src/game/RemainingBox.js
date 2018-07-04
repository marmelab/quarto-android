import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Box from './Box';

export default class RemainingBox extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        boxValue: PropTypes.string.isRequired,
        enabled: PropTypes.bool,
        selected: PropTypes.bool,
        badPiece: PropTypes.bool,
    };

    static defaultProps = {
        enabled: true,
    };

    handlePress = () => {
        const { enabled, boxValue, onPress } = this.props;
        if (enabled) {
            onPress(boxValue);
        }
    };

    render() {
        const { boxValue, enabled, selected, badPiece } = this.props;

        return (
            <Box
                boxSize={styles.boxSize}
                enabled={enabled}
                boxValue={boxValue}
                label={'remainingbox'}
                onPress={this.handlePress}
                selected={selected}
                badBox={badPiece}
            />
        );
    }
}

const styles = StyleSheet.create({
    boxSize: {
        height: 40,
        width: 40,
    },
});
