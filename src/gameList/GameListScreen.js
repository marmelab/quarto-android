import React from 'react';
import { Button, Text, ScrollView, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../styles/GameStyles';
import { getGame } from '../services/GameService';
import { showWarning } from '../services/WarningService';

export default class GameListScreen extends React.Component {
    state = {
        games:
            this.props.navigation && this.props.navigation.state
                ? this.props.navigation.state.params.games
                : [],
    };

    static navigationOptions = {
        title: 'Join a game',
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    render() {
        //const games = getListOfGames();
        //console.debug(games);
        return (
            <View style={styles.container}>
                <Text>Quarto Android</Text>
                <ScrollView style={localStyles.list}>
                    {this.state.games.map((game, gameKey) => {
                        return (
                            <View style={styles.buttonContainer} key={gameKey}>
                                <Button
                                    style={styles.button}
                                    onPress={() => this.openGame(game.idGame)}
                                    title={'Game #' + game.idGame}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }

    openGame = async idGame => {
        const { navigation } = this.props;
        try {
            var game = await getGame(idGame);
            navigation.navigate('Game', {
                game,
            });
        } catch (error) {
            showWarning();
        }
    };
}

const localStyles = StyleSheet.create({
    list: {
        width: '100%',
    },
});
