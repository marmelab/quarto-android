import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles/GameStyles';
import { newGame, listGames } from '../services/GameService';
import { showWarning } from '../services/WarningService';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Quarto Android',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Quarto Android</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        onPress={this.openNewGame2P}
                        title="Start a new game (2P)"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        onPress={this.showGameList}
                        title="Show existing games"
                    />
                </View>
            </View>
        );
    }

    openNewGame2P = () => {
        this.openNewGame(2);
    };

    openNewGame1P = () => {
        this.openNewGame(1);
    };

    openNewGame = async numberOfPlayers => {
        try {
            var game = await newGame(numberOfPlayers);
            this.openGame(game);
        } catch (error) {
            showWarning(error);
        }
    };

    openGame = async game => {
        const { navigation } = this.props;
        navigation.navigate('Game', {
            game,
        });
    };

    showGameList = async () => {
        try {
            const { navigation } = this.props;
            var games = await listGames();
            navigation.navigate('GameList', { games });
        } catch (error) {
            showWarning(error);
        }
    };
}
