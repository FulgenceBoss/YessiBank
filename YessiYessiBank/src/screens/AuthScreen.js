import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {sendOtp, verifyOtp} from '../store/authSlice';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Le même thème que WelcomeScreen pour la cohérence
const theme = {
  primary: '#2e7d32',
  success: '#4caf50',
  surface: '#ffffff',
  textPrimary: '#212121',
  textSecondary: '#757575',
  lightGreen: '#e8f5e9',
  gold: '#ffd700',
  gradientStart: '#fafafa',
  gradientEnd: '#f8f9fa',
  error: '#d32f2f',
};

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const {loading, error, otpSent} = useSelector(state => state.auth);

  const validateGabonPhoneNumber = number => {
    const gabonPhoneRegex = /^(06|07)\d{7}$/;
    return gabonPhoneRegex.test(number);
  };

  const handleSendOtp = () => {
    if (validateGabonPhoneNumber(phoneNumber)) {
      dispatch(sendOtp(phoneNumber));
    } else {
      Alert.alert(
        'Numéro Invalide',
        'Veuillez entrer un numéro de téléphone gabonais valide (ex: 06xxxxxxx ou 07xxxxxxx).',
      );
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      dispatch(verifyOtp({phoneNumber, otp}));
    } else {
      Alert.alert('Code Invalide', 'Veuillez entrer le code à 6 chiffres.');
    }
  };

  const renderPhoneInput = () => (
    <>
      <Text style={styles.header}>Bienvenue !</Text>
      <Text style={styles.subHeader}>Entrez votre numéro pour commencer.</Text>
      <View style={styles.inputContainer}>
        <Icon
          name="phone"
          size={24}
          color={theme.primary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Ex: 061234567"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholderTextColor={theme.textSecondary}
        />
      </View>
      <TouchableOpacity onPress={handleSendOtp} disabled={loading}>
        <LinearGradient
          colors={[theme.primary, theme.success]}
          style={styles.ctaButton}>
          <Text style={styles.ctaText}>Envoyer le code</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  const renderOtpInput = () => (
    <>
      <Text style={styles.header}>Vérification</Text>
      <Text style={styles.subHeader}>
        Nous avons envoyé un code à {phoneNumber}
      </Text>
      <View style={styles.inputContainer}>
        <Icon
          name="numeric-6-box-multiple-outline"
          size={24}
          color={theme.primary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="123456"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
          placeholderTextColor={theme.textSecondary}
        />
      </View>
      <TouchableOpacity onPress={handleVerifyOtp} disabled={loading}>
        <LinearGradient
          colors={[theme.primary, theme.success]}
          style={styles.ctaButton}>
          <Text style={styles.ctaText}>Vérifier le code</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );

  return (
    <LinearGradient
      colors={[theme.gradientStart, theme.gradientEnd]}
      style={styles.safeArea}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.gradientStart}
        />
        <View style={styles.container}>
          <View style={styles.card}>
            {!otpSent ? renderPhoneInput() : renderOtpInput()}

            {loading && (
              <ActivityIndicator
                size="large"
                color={theme.primary}
                style={styles.loader}
              />
            )}
            {error && (
              <Text style={styles.errorText}>
                Erreur: {error.message || 'Une erreur est survenue'}
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    fontSize: 28,
    fontFamily: 'Roboto_900Black',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    color: theme.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.lightGreen,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.2)',
    width: '100%',
    marginBottom: 24,
  },
  icon: {
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
    color: theme.textPrimary,
  },
  ctaButton: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: theme.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    textTransform: 'uppercase',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: theme.error,
    marginTop: 16,
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
  },
});

export default AuthScreen;
