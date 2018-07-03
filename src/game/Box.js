import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

export default class Box extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        boxValue: PropTypes.string.isRequired,
        boxSize: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        enabled: PropTypes.bool,
        selected: PropTypes.bool,
        winningBox: PropTypes.bool,
    };

    static defaultProps = {
        enabled: true,
    };

    render() {
        const {
            enabled,
            boxValue,
            boxSize,
            label,
            onPress,
            selected,
            winningBox,
        } = this.props;
        const pieceImageArray = initImagesRequire();
        return (
            <TouchableHighlight
                accessible={true}
                accessibilityLabel={label}
                style={[
                    boxSize,
                    styles.box,
                    winningBox ? styles.winning : '',
                    enabled ? styles.enabled : '',
                    selected ? styles.selected : '',
                ]}
                onPress={enabled ? onPress : null}
                underlayColor={enabled ? clickedBoxColor : normalBoxColor}
            >
                <Image style={boxSize} source={pieceImageArray[boxValue]} />
            </TouchableHighlight>
        );
    }
}

const initImagesRequire = () => {
    const pieceImageArray = [
        0,
        require('../../resources/images/pieceImage1.png'),
        require('../../resources/images/pieceImage2.png'),
        require('../../resources/images/pieceImage3.png'),
        require('../../resources/images/pieceImage4.png'),
        require('../../resources/images/pieceImage5.png'),
        require('../../resources/images/pieceImage6.png'),
        require('../../resources/images/pieceImage7.png'),
        require('../../resources/images/pieceImage8.png'),
        require('../../resources/images/pieceImage9.png'),
        require('../../resources/images/pieceImage10.png'),
        require('../../resources/images/pieceImage11.png'),
        require('../../resources/images/pieceImage12.png'),
        require('../../resources/images/pieceImage13.png'),
        require('../../resources/images/pieceImage14.png'),
        require('../../resources/images/pieceImage15.png'),
        require('../../resources/images/pieceImage16.png'),
    ];
    return pieceImageArray;
};

const normalBoxColor = 'lightblue';
const winningBoxColor = 'green';
const clickedBoxColor = '#6699ff';
const selectedBoxColor = '#80ffbf';

const styles = StyleSheet.create({
    box: {
        opacity: 0.6,
        alignItems: 'center',
        backgroundColor: normalBoxColor,
        display: 'flex',
        justifyContent: 'center',
        margin: 4,
    },
    winning: {
        backgroundColor: winningBoxColor,
    },
    enabled: {
        opacity: 1,
        elevation: 1,
    },
    selected: {
        backgroundColor: selectedBoxColor,
    },
});
