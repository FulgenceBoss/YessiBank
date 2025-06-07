import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {sendOtp, verifyOtp} from '../store/authSlice';

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const {loading, error, otpSent, isAuthenticated} = useSelector(
    state => state.auth,
  );

  const handleSendOtp = () => {
    if (phoneNumber.length >= 9) {
      // Simple validation
      dispatch(sendOtp(phoneNumber));
    } else {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone valide.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      // Simple validation
      dispatch(verifyOtp({phoneNumber, otp}));
    } else {
      Alert.alert('Erreur', 'Veuillez entrer le code OTP à 6 chiffres.');
    }
  };

  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Connexion réussie !</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentification</Text>
      {!otpSent ? (
        <>
          <Text>Entrez votre numéro de téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 061234567"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={!otpSent}
          />
          <Button
            title="Envoyer le code"
            onPress={handleSendOtp}
            disabled={loading}
          />
        </>
      ) : (
        <>
          <Text style={styles.phoneLockText}>Numéro : {phoneNumber}</Text>
          <Text>Entrez le code reçu par SMS</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
          />
          <Button
            title="Vérifier le code"
            onPress={handleVerifyOtp}
            disabled={loading}
          />
        </>
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && (
        <Text style={styles.errorText}>
          Erreur: {error.message || 'Une erreur est survenue'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  phoneLockText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default AuthScreen;
