import React from 'react';
import { Text, View, ActivityIndicator, Button } from 'react-native';
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

export default class GameScreen extends React.Component {
    state = {
        game: {},
        loading: true,
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
                <View>
                    <Text>{title}</Text>
                    {navigation.state.params.loading && (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            ),
        };
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    async componentDidMount() {
        const {
            idGame,
            numberPlayers,
            register,
        } = this.props.navigation.state.params;
        this.setState({ loading: true });
        let game = {};
        if (idGame) {
            game = await getGame(idGame, register);
        } else if (numberPlayers) {
            game = await newGame(numberPlayers);
        }
        this.setState({ game, loading: false });
        this.props.navigation.setParams({ idGame: game.idGame });

        this.interval = setInterval(async () => {
            this.setState({ loading: true });
            this.props.navigation.setParams({ loading: this.state.loading });
            game = await getGame(this.state.game.idGame, false);
            this.setState({ game, loading: false });
            this.props.navigation.setParams({ loading: this.state.loading });
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { game, loading } = this.state;
        return (
            <View style={styles.container}>
                {game.grid ? (
                    <View style={styles.container}>
                        <Grid
                            onPress={this.handleGridPress}
                            grid={game.grid}
                            readOnly={game.locked}
                        />
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
