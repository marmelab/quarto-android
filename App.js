import { createStackNavigator } from 'react-navigation';

import HomeScreen from './src/home/HomeScreen';
import GameScreen from './src/game/GameScreen';
import GameListScreen from './src/gameList/GameListScreen';

const App = createStackNavigator({
    Home: { screen: HomeScreen },
    Game: { screen: GameScreen },
    GameList: { screen: GameListScreen },
});

export default App;
