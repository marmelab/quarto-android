import React from 'react';
import { Button, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { newGame } from '../services/GameService';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Quarto Android',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Quarto Android</Text>
        <Text>This is your home</Text>
        <Button
          style={styles.button}
          onPress={this.openNewGame2P}
          title="Start a new game (2P)"></Button>
        <Button
          style={styles.button}
          onPress={this.showGameList}
          title="Show existing games"></Button>
      </View>
    );
  };

  openNewGame2P = () => {
    this.openNewGame(2);
  };

  openNewGame1P = () => {
    this.openNewGame(1);
  };

  openNewGame = async (numberPlayers) => {
    try {
      game = await newGame(numberPlayers);
      this.openGame(game);
    } catch (error) {
      ToastAndroid.showWithGravity(
        'A server error occured, please retry later.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  openGame = (game) => {
    const { navigation } = this.props;
    navigation.navigate('Game', {
      game
    });
  };

  showGameList = async => {
    try {
      const { navigation } = this.props;
      navigation.navigate('GameList', {
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'A server error occured, please retry later.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
