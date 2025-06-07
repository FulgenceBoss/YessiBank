import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import store from './src/store/store';
import AuthScreen from './src/screens/AuthScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}} // On cache l'en-tête pour cet écran
          />
          {/* Nous ajouterons d'autres écrans ici, comme l'écran d'accueil */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
