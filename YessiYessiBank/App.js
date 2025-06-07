import React, {useEffect} from 'react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Button, ActivityIndicator} from 'react-native';

import store from './src/store/store';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import {logoutUser, checkAuth} from './src/store/authSlice'; // Importer les nouvelles actions

const Stack = createNativeStackNavigator();

// Un écran d'accueil simple pour l'instant
const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Écran d'accueil</Text>
      <Button title="Déconnexion" onPress={() => dispatch(logoutUser())} />
    </View>
  );
};

const SplashScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" />
  </View>
);

const RootNavigator = () => {
  const {isAuthenticated, appIsReady} = useSelector(state => state.auth);

  useEffect(() => {
    // Note: Le store est directement utilisé ici car ce composant est en dehors du Provider
    store.dispatch(checkAuth());
  }, []);

  if (!appIsReady) {
    return <SplashScreen />;
  }

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
      <RootNavigator />
    </Provider>
  );
}
