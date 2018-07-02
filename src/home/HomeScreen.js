import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles/GameStyles';
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
                        onPress={() => this.openNewGame(2)}
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

    openNewGame = async numberPlayers => {
        const { navigation } = this.props;
        navigation.navigate('Game', {
            numberPlayers,
        });
    };

    showGameList = async () => {
        try {
            const { navigation } = this.props;
            navigation.navigate('GameList');
        } catch (error) {
            showWarning(error);
        }
    };
}
