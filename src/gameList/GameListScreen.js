import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles/GameStyles';
import { showWarning } from '../services/WarningService';

export default class GameListScreen extends React.Component {
    static navigationOptions = {
        title: 'Join a game',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Quarto Android</Text>
                <Text>This is game list</Text>
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
            showWarning(error);
        }
    };
}
