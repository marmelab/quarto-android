import { AsyncStorage } from 'react-native';
import { showWarning } from './WarningService';

export const storeGameToken = async (idGame, token) => {
    try {
        const tokenList = await generateStorageTokens(idGame, token);
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
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem('@Quarto:gameTokens');
        if (value !== null) {
            return JSON.parse(value);
        }
        return {};
    } catch (error) {
        showWarning(error, 'Data cannot be read in device');
    }
};

export const retrieveGameToken = async idGame => {
    const tokenList = await retrieveGameTokenList();
    return tokenList[idGame];
};

const generateStorageTokens = async (idGame, token) => {
    const tokenList = await retrieveGameTokenList();
    if (idGame && token) {
        tokenList[idGame] = token;
    }
    return tokenList;
};
