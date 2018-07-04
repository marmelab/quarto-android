import { AsyncStorage } from 'react-native';
import { showWarning } from './WarningService';

const prefixStorage = '@Quarto:';
const tokenStorage = `${prefixStorage}gameTokens`;
const pageStorage = `${prefixStorage}currentPage`;
const gameStorage = `${prefixStorage}currentGame`;
const listStorage = `${prefixStorage}currentList`;

export const storeGameToken = async (idGame, token) => {
    try {
        const tokenList = await generateStorageTokens(idGame, token);
        await AsyncStorage.setItem(tokenStorage, JSON.stringify(tokenList));
    } catch (error) {
        showWarning(error, 'Data cannot be saved in device');
    }
};

export const retrieveGameTokenList = async () => {
    try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem(tokenStorage);
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
        await AsyncStorage.setItem(pageStorage, page);
    } catch (error) {
        showWarning(error, 'Current page cannot be saved in device');
    }
};

export const retrieveCurrentPage = async () => {
    try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem(pageStorage);
        return value;
    } catch (error) {
        showWarning(error, 'Current page cannot be read in device');
    }
};

export const storeCurrentGameId = async idGame => {
    try {
        await AsyncStorage.setItem(gameStorage, String(idGame));
    } catch (error) {
        showWarning(error, 'Current game cannot be saved in device');
    }
};

export const retrieveCurrentGameId = async () => {
    try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem(gameStorage);
        return parseInt(value);
    } catch (error) {
        showWarning(error, 'Current game cannot be read in device');
    }
};

export const storeCurrentList = async listType => {
    try {
        await AsyncStorage.setItem(listStorage, listType);
    } catch (error) {
        showWarning(error, 'Current game list cannot be saved in device');
    }
};

export const retrieveCurrentList = async () => {
    try {
        //await AsyncStorage.clear();
        const value = await AsyncStorage.getItem(listStorage);
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
