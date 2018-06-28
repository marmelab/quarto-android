import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import RemainingBox from './RemainingBox';

export default class RemainingList extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        list: PropTypes.object.isRequired,
        readOnly: PropTypes.bool,
    };

    static defaultProps = {
        readOnly: true,
    };

    render() {
        const { list, readOnly, onPress } = this.props;
        return (
            <View style={styles.row}>
                {Object.keys(list).map(pieceKey => {
                    if (!list[pieceKey].used) {
                        return (
                            <RemainingBox
                                key={pieceKey}
                                boxValue={String(list[pieceKey].id)}
                                enabled={!readOnly}
                                onPress={onPress}
                            />
                        );
                    }
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        width: '100%',
    },
});
