import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import React from 'react';
import HomeScreen from './src/home/HomeScreen';
import GameScreen from './src/game/GameScreen';
import GameListScreen from './src/gameList/GameListScreen';
import {
    retrieveCurrentGameId,
    retrieveCurrentPage,
    retrieveCurrentList,
} from './src/services/StorageService';
import { View, ActivityIndicator } from 'react-native';

class App extends React.Component {
    state = {
        page: 'Home',
        idGame: 0,
        list: 'current',
        loading: true,
    };

    componentDidMount = async () => {
        const page = await retrieveCurrentPage();
        const idGame = await retrieveCurrentGameId();
        const list = await retrieveCurrentList();
        if (page != null) {
            this.setState({ page: page, idGame: idGame, list: list });
        }
        this.setState({ loading: false });
    };

    render() {
        if (this.state.loading)
            return (
                <View>
                    <ActivityIndicator size="large" />
                </View>
            );
        const Navigator = createStackNavigator(
            {
                Home: { screen: HomeScreen },
                Game: {
                    screen: GameScreen,
                    navigationOptions: ({ navigation }) => ({
                        headerLeft: (
                            <HeaderBackButton
                                onPress={() => {
                                    if (!navigation.goBack())
                                        navigation.navigate('Home');
                                }}
                            />
                        ),
                    }),
                },
                GameList: {
                    screen: GameListScreen,
                    navigationOptions: ({ navigation }) => ({
                        headerLeft: (
                            <HeaderBackButton
                                onPress={() => {
                                    if (!navigation.goBack())
                                        navigation.navigate('Home');
                                }}
                            />
                        ),
                    }),
                },
            },
            {
                initialRouteName: this.state.page,
                initialRouteParams: {
                    idGame: this.state.idGame,
                    listType: this.state.list,
                    initial: true,
                },
            },
        );
        return React.createElement(Navigator);
    }
}

export default App;
