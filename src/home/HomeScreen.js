import React from 'react';
import { Button, Toast, Text, View } from 'react-native';
import { styles } from '../styles/GameStyles';
import { newGame } from '../services/GameService';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Quarto Android',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Quarto Android</Text>
                <Text>This is your home</Text>
                <Button
                    style={styles.button}
                    onPress={this.openNewGame2P}
                    title="Start a new game (2P)"
                />
                <Button
                    style={styles.button}
                    onPress={this.showGameList}
                    title="Show existing games"
                />
            </View>
        );
    }

    openNewGame2P = () => {
        this.openNewGame(2);
    };

    openNewGame1P = () => {
        this.openNewGame(1);
    };

    openNewGame = async numberPlayers => {
        try {
            var game = await newGame(numberPlayers);
            this.openGame(game);
        } catch (error) {
            Toast.showWithGravity(
                'A server error occured, please retry later.',
                Toast.LONG,
                Toast.BOTTOM,
            );
        }
    };

    openGame = game => {
        const navigation = this.props;
        navigation.navigate('Game', {
            game,
        });
    };

    showGameList = async () => {
        try {
            const { navigation } = this.props;
            navigation.navigate('GameList');
        } catch (error) {
            Toast.showWithGravity(
                'A server error occured, please retry later.',
                Toast.LONG,
                Toast.BOTTOM,
            );
        }
    };
}
