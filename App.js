import { createStackNavigator } from 'react-navigation';

import HomeScreen from './routes/HomeScreen';
import GameScreen from './routes/GameScreen';
import GameListScreen from './routes/GameListScreen';

const App = createStackNavigator({
    Home: { screen: HomeScreen },
    Game: { screen: GameScreen },
    GameList: { screen: GameListScreen },
});

export default App;