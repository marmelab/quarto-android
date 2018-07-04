import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles/GameStyles';
import PropTypes from 'prop-types';
import { showWarning } from '../services/WarningService';
import { storeCurrentPage } from '../services/StorageService';

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
        );
    }

    openNewGame = async numberPlayers => {
        try {
            const { navigation } = this.props;
            navigation.navigate('Game', {
                numberPlayers,
            });
        } catch (error) {
            showWarning(error);
        }
    };

    showGameList = async listType => {
        try {
            const { navigation } = this.props;
            navigation.navigate('GameList', {
                listType,
            });
        } catch (error) {
            showWarning(error);
        }
    };
}
