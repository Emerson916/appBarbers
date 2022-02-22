import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import UserContextProvider from './contexts/UserContext';
import MainStack from './stacks/MainStack';

const App = () => {
  return (
    //UserContextProvider - Component com informações do usuario, que poderão ser acessadas de qualquer lugar ao englobar nas rotas
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
};

//Parei em 2:15:00

export default App;
