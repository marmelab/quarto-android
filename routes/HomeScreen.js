import React from 'react';
import { Button, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Quarto Android</Text>
        <Text>This is home</Text>
        <Button
          style={styles.button}
          onPress={this.openGame}
          title="Start a new game (2P)"></Button>
        <Button
          style={styles.button}
          onPress={this.showGameList}
          title="Show existing games"></Button>
      </View>
    );
  }

  openGame = async mode => {
    try {
      const { navigation } = this.props;
      navigation.navigate('Game', {
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'A server error occured, please retry later.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };

  showGameList = async mode => {
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
