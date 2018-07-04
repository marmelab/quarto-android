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
        loading: true,
        params: {},
    };

    componentDidMount = async () => {
        const [page, idGame, listType] = await Promise.all([
            retrieveCurrentPage(),
            retrieveCurrentGameId(),
            retrieveCurrentList(),
        ]);
        let params = {};
        if (page == 'Game' && idGame !== null) {
            params.idGame = idGame;
        }
        if (page == 'GameList' && listType !== null) {
            params.listType = listType;
        }
        this.setState({ loading: false, page, params });
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
                initialRouteParams: this.state.params,
            },
        );

        return React.createElement(Navigator);
    }
}

export default App;
