import React from 'react';
import { Button, Toast, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../styles/GameStyles';

export default class GameScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const gameId = navigation.state.params.game.id;
        const numberPlayers = navigation.state.params.game.numberPlayers;
        let title = `Quarto game `;
        if (gameId) {
            title += ` #${gameId}`;
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
                <Button
                    style={styles.button}
                    onPress={this.backHome}
                    title="Back to home"
                />
            </View>
        );
    }

    backHome = async () => {
        try {
            const { navigation } = this.props;
            navigation.navigate('Home');
        } catch (error) {
            Toast.showWithGravity(
                'A server error occured, please retry later.',
                Toast.LONG,
                Toast.BOTTOM,
            );
        }
    };
}
