import React from 'react';
import { Text, View, ActivityIndicator, Button } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../styles/GameStyles';
import { placePiece, selectPiece } from '../services/GameService';
import { showWarning } from '../services/WarningService';
import Grid from './Grid';
import RemainingList from './RemainingList';

export default class GameScreen extends React.Component {
    state = {
        game: this.props.navigation.state.params.game,
        loading: true,
    };

    static navigationOptions = ({ navigation }) => {
        const idGame = navigation.state.params.game.idGame;
        const numberOfPlayers = 2;
        let title = `Quarto game `;
        if (idGame) {
            title += ` #${idGame}`;
        }
        if (numberOfPlayers) {
            title += ` (${numberOfPlayers} players)`;
        }
        return { title };
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    async componentDidMount() {
        this.setState({ loading: true });
        //const games = await listGames();
        this.setState({ loading: false });
    }

    render() {
        const { game, loading } = this.state;
        if (game.idGame == 0) showWarning();
        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {game.grid ? (
                    <View style={styles.container}>
                        <Grid
                            onPress={this.handleGridPress}
                            grid={game.grid}
                            readOnly={false}
                        />
                        <Text>Choose a piece for opponent</Text>
                        <RemainingList
                            onPress={this.handleRemainingListPress}
                            list={game.allPieces}
                            readOnly={false}
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
