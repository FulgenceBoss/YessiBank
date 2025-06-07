import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Yessi-Yessi Bank</Text>
      <Image
        source={require('../../assets/icon.png')} // Assurez-vous que le chemin est correct
        style={styles.logo}
      />
      <Text style={styles.subtitle}>L'épargne facile, à portée de main.</Text>
      <View style={styles.buttonContainer}>
        <Button title="Commencer" onPress={() => navigation.navigate('Auth')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
  },
});

export default WelcomeScreen;
