import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Box from './Box';

export default class GridBox extends Component {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
        boxValue: PropTypes.string.isRequired,
        enabled: PropTypes.bool,
    };

    static defaultProps = {
        enabled: true,
    };

    handlePress = () => {
        const { enabled, x, y, onPress } = this.props;
        if (enabled) {
            onPress(x, y);
        }
    };

    render() {
        const { boxValue, enabled, x, y } = this.props;

        return (
            <Box
                boxSize={styles.boxSize}
                enabled={enabled}
                boxValue={boxValue}
                label={'gridbox_x' + String(x) + '_y' + String(y)}
                onPress={this.handlePress}
            />
        );
    }
}

const styles = StyleSheet.create({
    boxSize: {
        height: 60,
        width: 60,
    },
});
