import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {sendOtp, verifyOtp} from '../store/authSlice';

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch();
  const {isLoading, error, otpSent, isAuthenticated} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      // TODO: Naviguer vers l'écran d'accueil
      Alert.alert('Succès', 'Vous êtes connecté !');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      Alert.alert('Erreur', error.msg || 'Une erreur est survenue.');
    }
  }, [error]);

  const handleSendOtp = () => {
    // Préfixe +241 pour le numéro gabonais
    const fullPhoneNumber = `241${phoneNumber}`;
    dispatch(sendOtp(fullPhoneNumber));
  };

  const handleVerifyOtp = () => {
    const fullPhoneNumber = `241${phoneNumber}`;
    dispatch(verifyOtp({phoneNumber: fullPhoneNumber, code: otp}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rejoignez Yessi-Yessi</Text>
      <Text style={styles.subtitle}>
        Votre parcours vers l'indépendance financière commence ici.
      </Text>

      {!otpSent ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>🇬🇦 +241</Text>
            <TextInput
              style={styles.input}
              placeholder="XXXXXXXXX"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={9}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSendOtp}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Recevoir mon code</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={[styles.input, styles.otpInput]}
            placeholder="Entrez le code à 6 chiffres"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyOtp}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Vérifier & Se Connecter</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  otpInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AuthScreen;
