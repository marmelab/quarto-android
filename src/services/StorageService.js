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

export const storeCurrentPage = async page => {
    try {
        await AsyncStorage.setItem('@Quarto:currentPage', page);
    } catch (error) {
        showWarning(error, 'Current page cannot be saved in device');
    }
};

export const retrieveCurrentPage = async () => {
    try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem('@Quarto:currentPage');
        return value;
    } catch (error) {
        showWarning(error, 'Current page cannot be read in device');
    }
};

export const storeCurrentGameId = async idGame => {
    try {
        await AsyncStorage.setItem('@Quarto:currentGame', String(idGame));
    } catch (error) {
        showWarning(error, 'Current game cannot be saved in device');
    }
};

export const retrieveCurrentGameId = async () => {
    try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem('@Quarto:currentGame');
        return parseInt(value);
    } catch (error) {
        showWarning(error, 'Current game cannot be read in device');
    }
};

export const storeCurrentList = async listType => {
    try {
        await AsyncStorage.setItem('@Quarto:currentList', listType);
    } catch (error) {
        showWarning(error, 'Current game list cannot be saved in device');
    }
};

export const retrieveCurrentList = async () => {
    try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem('@Quarto:currentList');
        return value;
    } catch (error) {
        showWarning(error, 'Current game list cannot be read in device');
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        showWarning(error, 'Storage connot be cleared in device');
    }
};
