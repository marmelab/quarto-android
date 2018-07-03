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
import { withState } from 'recompose';

class GameScreen extends React.Component {
    state = {
        game: {},
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        loading: PropTypes.bool,
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const { idGame, numberPlayers, register } = navigation.state.params;

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
                            readOnly={game.locked}
                        />
                        {game.locked &&
                            !game.watch_only && (
                                <ActivityIndicator
                                    style={gamestyle.waiting}
                                    size="large"
                                />
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
const EnhancedGameScreen = withState('loading', 'setLoading', true)(GameScreen);
EnhancedGameScreen.navigationOptions = ({ navigation }) => {
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

export default EnhancedGameScreen;

export const gamestyle = StyleSheet.create({
    waiting: {
        position: 'absolute',
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
});
