import * as types from '../types';
import api from '../../../services/api';

const initialState = {
    isLoggedIn: false,
    token: false,
    user: {},
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            const newState = { ...state };
            newState.isLoggedIn = true;
            newState.token = action.payload.token;
            newState.user = action.payload.user;
            return newState;
        }

        case types.LOGIN_FAILURE: {
            delete api.defaults.headers.Authorization;
            const newState = { ...initialState };
            return newState;
        }

        default: {
            return state;
        }
    }
}