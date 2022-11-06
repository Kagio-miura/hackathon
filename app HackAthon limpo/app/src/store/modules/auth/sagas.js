import { ToastAndroid } from "react-native";
import { call, put, all, takeLatest } from "redux-saga/effects";
import { get } from "lodash";

import * as RootNavigation from '../../../services/RootNavigation';

import api from "../../../services/api";
import * as actions from './actions';
import * as types from '../types';


function* loginRequest({ payload }) {
    try {
        const response = yield call(api.post, '/tokens', payload);
        yield put(actions.loginSuccess({ ...response.data }));

        ToastAndroid.show('Você fez login', ToastAndroid.SHORT);

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        RootNavigation.reset(0, "MyTabs");

    } catch (e) {
        ToastAndroid.show('Usuário ou senha inválidos', ToastAndroid.SHORT);

        yield put(actions.loginFailure());
    }
}

function persistRehydrate({ payload }) {
    const token = get(payload, 'auth.token', '');
    if (!token) return;

    api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate)
]);