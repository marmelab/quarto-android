import React from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    Button,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../styles/GameStyles';
import {
    getGame,
    newGame,
    placePiece,
    selectPiece,
    getActionText,
} from '../services/GameService';
import { showWarning } from '../services/WarningService';
import Grid from './Grid';
import RemainingList from './RemainingList';
import { storeCurrentPage } from '../services/StorageService';

export default class GameScreen extends React.Component {
    state = {
        game: {},
    };

    static navigationOptions = ({ navigation }) => {
        const idGame = navigation.state.params.idGame
            ? navigation.state.params.idGame
            : '(...)';
        const numberOfPlayers = 2;
        let title = `Quarto game `;
        if (idGame) {
            title += ` #${idGame}`;
        }
        if (numberOfPlayers) {
            title += ` (${numberOfPlayers} players)`;
        }
        return {
            headerTitle: (
                <View style={styles.tabContainer}>
                    <Text style={styles.tabTitle}>{title}</Text>
                    {navigation.state.params.loading && (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            ),
        };
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        loading: PropTypes.bool,
    };

    async componentDidMount() {
        console.debug('componentDidMount GameListScreen');
        const { navigation } = this.props;
        const { idGame, numberPlayers, register } = navigation.state.params;
        await storeCurrentPage('Game');
        navigation.setParams({ loading: true });
        let game = {};
        if (idGame) {
            game = await getGame(idGame, register);
        } else if (numberPlayers) {
            game = await newGame(numberPlayers);
        }
        this.setState({ game });
        navigation.setParams({ loading: false });
        navigation.setParams({ idGame: game.idGame });

        this.interval = setInterval(async () => {
            navigation.setParams({ loading: true });
            game = await getGame(this.state.game.idGame, false);
            this.setState({ game });
            navigation.setParams({ loading: false });
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { game } = this.state;
        const { loading } = this.props;
        return (
            <View style={styles.container}>
                {game.grid ? (
                    <View style={styles.container}>
                        <Grid
                            onPress={this.handleGridPress}
                            grid={game.grid}
                            winningLine={game.winningLine}
                            readOnly={game.locked}
                        />
                        {game.locked &&
                            !game.closed &&
                            !game.watch_only && (
                                <ActivityIndicator
                                    style={gamestyle.waiting}
                                    size="large"
                                />
                            )}
                        {game.closed && (
                            <View style={gamestyle.closed}>
                                <View
                                    style={[
                                        gamestyle.opacity,
                                        gamestyle.closed,
                                        game.you_won
                                            ? gamestyle.winner
                                            : gamestyle.looser,
                                    ]}
                                />
                                <Text style={gamestyle.textClosed}>
                                    {createGameEndText(
                                        game.you_won,
                                        game.winner_id,
                                    )}
                                </Text>
                            </View>
                        )}
                        <Text>{getActionText(game)}</Text>
                        <RemainingList
                            onPress={this.handleRemainingListPress}
                            list={game.allPieces}
                            selectedPiece={game.selectedPiece}
                            readOnly={game.locked}
                        />
                    </View>
                ) : (
                    loading || (
                        <View>
                            <Text>Game not found !</Text>
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

    handleGridPress = async (x, y) => {
        try {
            const newGame = await placePiece(this.state.game, x, y);
            this.setState({
                game: newGame,
            });
        } catch (error) {
            showWarning(error);
        }
    };

    handleRemainingListPress = async piece => {
        try {
            const newGame = await selectPiece(this.state.game, piece);
            this.setState({
                game: newGame,
            });
        } catch (error) {
            showWarning(error);
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

const createGameEndText = (youWon, winnerId) => {
    if (youWon) {
        return 'Awesome !!!  You won !!!!';
    }
    if (winnerId == 0) {
        return "It's a draw";
    }
    return 'Player ' + String(winnerId) + ' won !';
};

const winColor = 'green';
const looseColor = 'red';

export const gamestyle = StyleSheet.create({
    waiting: {
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        elevation: 2,
    },
    opacity: {
        opacity: 0.3,
    },
    closed: {
        position: 'absolute',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        elevation: 4,
    },
    textClosed: {
        position: 'absolute',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
        height: '100%',
        fontSize: 30,
        fontWeight: 'bold',
        elevation: 4,
    },
    winner: {
        backgroundColor: winColor,
        elevation: 3,
    },
    looser: {
        backgroundColor: looseColor,
        elevation: 3,
    },
});
