import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native';

import store, { persistor } from './src/store';
import { navigationRef } from './src/services/RootNavigation';

import Routes from './src/routes';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar backgroundColor="#977DF8" barStyle="ligth-content" />
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}