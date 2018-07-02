import config from '../config.dist';
import { storeGameToken, retrieveGameTokenList } from './StorageService';

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
    var grid = [
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

export const getGame = idGame => {
    const url = `${BASE_URL}/${idGame}`;
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

export const listGames = () => {
    const url = `${BASE_URL}/list?${retrieveGameTokenList()}`;
    const method = 'GET';
    const headers = Object.assign({}, HEADER_JSON);
    return fetch(url, {
        method,
        headers,
    })
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            console.debug(url);
            return res;
        });
};

export const placePiece = (game, x, y) => {
    const url = `${BASE_URL}/${game.idGame}/place/${x}/${y}`;
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

export const selectPiece = (game, piece) => {
    const url = `${BASE_URL}/${game.idGame}/select/${piece}`;
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
