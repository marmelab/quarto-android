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
        const page = await retrieveCurrentPage();
        const idGame = await retrieveCurrentGameId();
        const listType = await retrieveCurrentList();
        if (page != null) {
            this.setState({ page: page });
        }
        if (page == 'Game' && idGame != null) {
            this.setState({ params: { idGame: idGame } });
        }
        if (page == 'GameList' && listType != null) {
            this.setState({ params: { listType: listType } });
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
                initialRouteParams: this.state.params,
            },
        );

        return React.createElement(Navigator);
    }
}

export default App;
