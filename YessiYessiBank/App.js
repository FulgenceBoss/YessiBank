import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Button} from 'react-native';

import store from './src/store/store';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import {logout} from './src/store/authSlice'; // Importer l'action de déconnexion

const Stack = createNativeStackNavigator();

// Un écran d'accueil simple pour l'instant
const HomeScreen = () => {
  const dispatch = store.dispatch; // Accès direct au dispatch
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Écran d'accueil</Text>
      <Button title="Déconnexion" onPress={() => dispatch(logout())} />
    </View>
  );
};

const AppNavigator = () => {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Tableau de Bord'}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{title: 'Authentification'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
