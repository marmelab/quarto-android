import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../styles/GameStyles';
import { placePiece, selectPiece } from '../services/GameService';
import { showWarning } from '../services/WarningService';
import Grid from './Grid';
import RemainingList from './RemainingList';

export default class GameScreen extends React.Component {
    state = {
        game: this.props.navigation.state.params.game,
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

    render() {
        return (
            <View style={styles.container}>
                <Grid
                    onPress={this.handleGridPress}
                    grid={this.state.game.grid}
                    readOnly={false}
                />
                <Text>Choose a piece for opponent</Text>
                <RemainingList
                    onPress={this.handleRemainingListPress}
                    list={this.state.game.allPieces}
                    readOnly={false}
                />
            </View>
        );
    }

    handleGridPress = async (x, y) => {
        try {
            var newGame = await placePiece(this.state.game, x, y);
            this.setState({
                game: newGame,
            });
        } catch (error) {
            showWarning();
        }
    };

    handleRemainingListPress = async piece => {
        try {
            var newGame = await selectPiece(this.state.game, piece);
            this.setState({
                game: newGame,
            });
        } catch (error) {
            showWarning();
        }
    };
}
