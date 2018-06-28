import config from '../config.dist';

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

export const newGameTest = numberPlayers => {
    var grid = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
    return {
        idGame: '1',
        grid: grid,
        selectedPiece: 0,
        numberPlayers: numberPlayers,
    };
};

export const newGame = numberPlayers => {
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
            res.numberPlayers = numberPlayers;
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
            res.numberPlayers = game.numberOfPlayers;
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
            res.numberPlayers = game.numberOfPlayers;
            return res;
        });
};
