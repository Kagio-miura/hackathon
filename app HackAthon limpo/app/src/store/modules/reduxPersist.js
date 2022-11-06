import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default reducers => {
    const persistedReducers = persistReducer(
        {
            key: 'HACKATHON',
            storage: AsyncStorage,
            whitelist: ['auth'],
        },
        reducers
    );

    return persistedReducers;
};
