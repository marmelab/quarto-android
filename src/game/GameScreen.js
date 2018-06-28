import React from 'react';
import { Button, ToastAndroid, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../styles/GameStyles';
import { placePiece, selectPiece } from '../services/GameService';
import Grid from './Grid';
import RemainingList from './RemainingList';

export default class GameScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: props.navigation.state.params.game,
            name: 'toto',
        };
    }

    static navigationOptions = ({ navigation }) => {
        const idGame = navigation.state.params.game.idGame;
        const numberPlayers = navigation.state.params.game.numberPlayers;
        let title = `Quarto game `;
        if (idGame) {
            title += ` #${idGame}`;
        }
        if (numberPlayers) {
            title += ` (${numberPlayers} players)`;
        }
        return { title };
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Quarto Android</Text>
                <Text>This is the game</Text>
                <Grid
                    onPress={this.placePiece}
                    grid={this.state.game.grid}
                    readOnly={false}
                />
                <RemainingList
                    onPress={this.selectPiece}
                    list={this.state.game.allPieces}
                    readOnly={false}
                />
                <Button
                    style={styles.button}
                    onPress={this.backHome}
                    title="Back to home"
                />
            </View>
        );
    }

    placePiece = async (x, y) => {
        var newGame = await placePiece(this.state.game, x, y);
        this.setState({
            game: newGame,
        });
    };

    selectPiece = async piece => {
        var newGame = await selectPiece(this.state.game, piece);
        this.setState({
            game: newGame,
        });
    };

    backHome = async () => {
        try {
            const { navigation } = this.props;
            navigation.navigate('Home');
        } catch (error) {
            ToastAndroid.showWithGravity(
                'A server error occured, please retry later.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            );
        }
    };
}
