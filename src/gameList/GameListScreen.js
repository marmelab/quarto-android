import React from 'react';
import {
    Button,
    Text,
    ScrollView,
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../styles/GameStyles';
import { listGames } from '../services/GameService';
import { showWarning } from '../services/WarningService';
import { storeCurrentPage, storeCurrentList } from '../services/StorageService';

export default class GameListScreen extends React.Component {
    state = {
        games: [],
    };

    static navigationOptions = ({ navigation }) => {
        const listType = navigation.state.params.listType
            ? navigation.state.params.listType
            : 'Play';
        let title = '';
        switch (listType) {
            case 'current':
                title += 'Continue';
                break;
            case 'opened':
                title += 'Join';
                break;
            case 'onlywatch':
                title += 'Watch';
        }
        title += ' a game';
        return {
            headerTitle: (
                <View style={styles.tabContainer}>
                    <Text style={styles.tabTitle}>{title}</Text>
                    {navigation.state.params.loading && (
                        <ActivityIndicator size="large" />
                    )}
                </View>
            ),
        };
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener(
            'didFocus',
            async () => {
                clearInterval(this.interval);
                const { navigation } = this.props;
                const { listType } = navigation.state.params;
                await storeCurrentPage('GameList');
                await storeCurrentList(listType);

                const games = await listGames(listType);
                this.setState({ games });
                this.interval = setInterval(async () => {
                    navigation.setParams({ loading: true });
                    this.setState({ listType: listType });
                    const games = await listGames(listType);
                    this.setState({ games });
                    navigation.setParams({ loading: false });
                }, 3000);
            },
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.focusListener.remove();
    }

    render() {
        const { games, loading, listType } = this.state;
        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {games.length ? (
                    <ScrollView style={localStyles.list}>
                        {games.map((game, gameKey) => {
                            return (
                                <View
                                    style={styles.buttonContainer}
                                    key={gameKey}
                                >
                                    <Button
                                        style={styles.button}
                                        onPress={() =>
                                            this.openGame(
                                                game.idGame,
                                                listType == 'opened',
                                            )
                                        }
                                        title={'Game #' + game.idGame}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                ) : (
                    loading || (
                        <View>
                            <Text>No game found !</Text>
                            <Button
                                style={styles.button}
                                onPress={this.backHome}
                                title="Go back home"
                            />
                        </View>
                    )
                )}
            </View>
        );
    }

    openGame = async (idGame, register) => {
        const { navigation } = this.props;
        try {
            navigation.navigate('Game', {
                idGame,
                register,
            });
        } catch (error) {
            showWarning();
        }
    };

    backHome = async () => {
        try {
            const { navigation } = this.props;
            navigation.navigate('Home');
        } catch (error) {
            showWarning(error);
        }
    };
}

const localStyles = StyleSheet.create({
    list: {
        width: '100%',
    },
});
