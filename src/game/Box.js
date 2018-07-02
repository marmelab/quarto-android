import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

export default class Box extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        boxValue: PropTypes.string.isRequired,
        enabled: PropTypes.bool,
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

    render(boxSize, label = 'box') {
        const { enabled, boxValue } = this.props;
        const pieceImageArray = initImagesRequire();

        return (
            <View testID="gridbox">
                <TouchableHighlight
                    accessible={true}
                    accessibilityLabel={label}
                    style={[boxSize, styles.box, enabled ? styles.enabled : '']}
                    onPress={this.handlePress}
                    underlayColor={clickedBoxColor}
                >
                    <Image style={boxSize} source={pieceImageArray[boxValue]} />
                </TouchableHighlight>
            </View>
        );
    }
}

const initImagesRequire = () => {
    var pieceImageArray = [];
    pieceImageArray[1] = require('../../resources/images/pieceImage1.png');
    pieceImageArray[2] = require('../../resources/images/pieceImage2.png');
    pieceImageArray[3] = require('../../resources/images/pieceImage3.png');
    pieceImageArray[4] = require('../../resources/images/pieceImage4.png');
    pieceImageArray[5] = require('../../resources/images/pieceImage5.png');
    pieceImageArray[6] = require('../../resources/images/pieceImage6.png');
    pieceImageArray[7] = require('../../resources/images/pieceImage7.png');
    pieceImageArray[8] = require('../../resources/images/pieceImage8.png');
    pieceImageArray[9] = require('../../resources/images/pieceImage9.png');
    pieceImageArray[10] = require('../../resources/images/pieceImage10.png');
    pieceImageArray[11] = require('../../resources/images/pieceImage11.png');
    pieceImageArray[12] = require('../../resources/images/pieceImage12.png');
    pieceImageArray[13] = require('../../resources/images/pieceImage13.png');
    pieceImageArray[14] = require('../../resources/images/pieceImage14.png');
    pieceImageArray[15] = require('../../resources/images/pieceImage15.png');
    pieceImageArray[16] = require('../../resources/images/pieceImage16.png');
    return pieceImageArray;
};

const normalBoxColor = 'lightblue';
const clickedBoxColor = 'green';

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        backgroundColor: normalBoxColor,
        display: 'flex',
        justifyContent: 'center',
        margin: 4,
    },
    enabled: {
        elevation: 3,
    },
});
