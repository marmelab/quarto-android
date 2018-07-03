import config from '../config.dist';
import {
    storeGameToken,
    retrieveGameTokenList,
    retrieveGameToken,
} from './StorageService';

const HEADER_JSON = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const BASE_URL = config.apiUrl;

function handleErrors(res) {
    if (!res.ok) {
        return Promise.reject(res.statusText);
    }
    return res;
}

export const newEmptyGame = numberOfPlayers => {
    const grid = [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
    ];
    return {
        idGame: '0',
        grid: grid,
        selectedPiece: 0,
        numberOfPlayers: numberOfPlayers,
        allPieces: {},
    };
};

export const newGame = () => {
    const url = `${BASE_URL}`;
    const method = 'POST';
    const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            storeGameToken(res.idGame, res.tokenPlayerOne);
            return res;
        });
};

export const getGame = async (idGame, register) => {
    let url = `${BASE_URL}/${idGame}`;
    if (register) {
        url += '?register=1';
    } else {
        let token = await retrieveGameToken(idGame);
        url += '?token=' + token;
    }
    const method = 'GET';
    const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            storeGameToken(res.idGame, res.tokenPlayerTwo);
            return res;
        });
};

export const listGames = async listType => {
    const tokenList = await retrieveGameTokenList();
    const url = `${BASE_URL}/${listType}list?tokenList=${JSON.stringify(
        tokenList,
    )}`;
    const method = 'GET';
    const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            return res;
        });
};

export const placePiece = async (game, x, y) => {
    let url = `${BASE_URL}/${game.idGame}/place/${x}/${y}`;
    let token = await retrieveGameToken(game.idGame);
    url += '?token=' + token;
    const method = 'PUT';
    const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            return res;
        });
};

export const selectPiece = async (game, piece) => {
    let url = `${BASE_URL}/${game.idGame}/select/${piece}`;
    let token = await retrieveGameToken(game.idGame);
    url += '?token=' + token;
    const method = 'PUT';
    const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            return res;
        });
};

export const getActionText = game => {
    if (!game.locked) {
        if (game.selectedPiece > 0) {
            return 'Place your piece on the board';
        }
        return 'Choose a piece for your opponent';
    } else if (game.watch_only) {
        return '(Watch only) Admire competitors talent';
    }
    return 'Meditate while waiting for your turn';
};
