import React from 'react';
import {
    Button,
    Text,
    ScrollView,
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../styles/GameStyles';
import { getGame, listGames } from '../services/GameService';
import { showWarning } from '../services/WarningService';

export default class GameListScreen extends React.Component {
    state = {
        games: [],
        loading: true,
    };

    static navigationOptions = {
        title: 'Join a game',
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    async componentDidMount() {
        this.setState({ loading: true });
        const games = await listGames();
        this.setState({ games, loading: false });
    }

    render() {
        const { games, loading } = this.state;
        return (
            <View style={styles.container}>
                <Text>Quarto Android</Text>
                {loading && <ActivityIndicator size="large" />}
                {games.length ? (
                    <ScrollView style={localStyles.list}>
                        {games.map((game, gameKey) => {
                            return (
                                <View
                                    style={styles.buttonContainer}
                                    key={gameKey}
                                >
                                    <Button
                                        style={styles.button}
                                        onPress={() =>
                                            this.openGame(game.idGame)
                                        }
                                        title={'Game #' + game.idGame}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                ) : (
                    loading || (
                        <View>
                            <Text>No game found !</Text>
                            <Button
                                style={styles.button}
                                onPress={this.backHome}
                                title="Go back home"
                            />
                        </View>
                    )
                )}
            </View>
        );
    }

    openGame = async idGame => {
        const { navigation } = this.props;
        try {
            const game = await getGame(idGame);
            navigation.navigate('Game', {
                game,
            });
        } catch (error) {
            showWarning();
        }
    };

    backHome = async () => {
        try {
            const { navigation } = this.props;
            navigation.navigate('Home');
        } catch (error) {
            showWarning(error);
        }
    };
}

const localStyles = StyleSheet.create({
    list: {
        width: '100%',
    },
});
