import React from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { styles } from '../styles/GameStyles';
import PropTypes from 'prop-types';
import { showWarning } from '../services/WarningService';
import { storeCurrentPage } from '../services/StorageService';

const boardImage = require('../../resources/images/boardTitle.jpg');

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Quarto Android',
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener(
            'didFocus',
            async () => {
                await storeCurrentPage('Home');
            },
        );
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={localStyles.page}>
                    <Text>Quarto Android</Text>
                    <View style={localStyles.imageContainer}>
                        <Image
                            style={localStyles.titleImageSize}
                            source={boardImage}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            onPress={() => this.openNewGame(2)}
                            title="Start a new game (dual)"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            onPress={() => this.openNewGame(1)}
                            title="Start a new game (single)"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            onPress={() => this.showGameList('current')}
                            title="My games"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            onPress={() => this.showGameList('opened')}
                            title="Join opened games"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            onPress={() => this.showGameList('onlywatch')}
                            title="Only watch a game"
                        />
                    </View>
                </View>
            </View>
        );
    }

    openNewGame = async numberPlayers => {
        try {
            this.props.navigation.navigate('Game', {
                numberPlayers,
            });
        } catch (error) {
            showWarning(error);
        }
    };

    showGameList = async listType => {
        try {
            this.props.navigation.navigate('GameList', {
                listType,
            });
        } catch (error) {
            showWarning(error);
        }
    };
}

const localStyles = StyleSheet.create({
    page: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    titleImageSize: {
        width: '60%',
    },
    imageContainer: {
        width: '80%',
        height: 200,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
