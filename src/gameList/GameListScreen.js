import React from 'react';
import { Button, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

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
          title="Back to home"></Button>
      </View>
    );
  }

  backHome = async => {
    try {
      const { navigation } = this.props;
      navigation.navigate('Home', {
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'A server error occured, please retry later.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
