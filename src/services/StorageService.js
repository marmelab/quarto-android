import { AsyncStorage } from 'react-native';
import { showWarning } from './WarningService';

export const storeGameToken = async (idGame, token) => {
    try {
        console.debug('storeGameToken start');
        const tokenList = await generateStorageTokens(idGame, token);
        console.debug(tokenList);
        console.debug('storeGameToken');
        console.debug(tokenList);
        console.debug(JSON.stringify(tokenList));
        await AsyncStorage.setItem(
            '@Quarto:gameTokens',
            JSON.stringify(tokenList),
        );
    } catch (error) {
        showWarning(error, 'Data cannot be saved in device');
    }
};

export const retrieveGameTokenList = async () => {
    try {
        const value = await AsyncStorage.getItem('@Quarto:gameTokens');
        console.debug('retrieveGameTokenList');
        console.debug({ value });
        if (value !== null) {
            console.debug('value.json()');
            console.debug(value.json());
            console.debug('retrieveGameTokenList and');
            return value.json();
        }
        return {};
    } catch (error) {
        console.debug('error');
        console.debug(error);
        showWarning(error, 'Data cannot be read in device');
    }
};

export const retrieveGameToken = async idGame => {
    const tokenList = await retrieveGameTokenList();
    return tokenList[idGame];
};

const generateStorageTokens = async (idGame, token) => {
    const tokenList = await retrieveGameTokenList();
    tokenList[idGame] = token;
    return tokenList;
};
