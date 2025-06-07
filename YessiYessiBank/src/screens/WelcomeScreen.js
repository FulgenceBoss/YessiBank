import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  illustrationGradientStart: '#e8f5e9',
  illustrationGradientEnd: '#f1f8e9',
};

const WelcomeScreen = ({navigation}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim, sparkleAnim]);

  const sparkleInterpolate = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.7, 1.2, 0.7],
  });

  const sparkleRotate = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleContinue = () => {
    navigation.navigate('Auth');
  };

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
          {/* Header Section */}
          <View style={styles.heroHeader}>
            <View style={styles.logoContainer}>
              <Animated.View
                style={[
                  styles.elephantIcon,
                  {transform: [{scale: pulseAnim}]},
                ]}>
                <Icon name="elephant" size={20} color="white" />
              </Animated.View>
              <Text style={styles.appLogo}>
                YESSI-YESSI <Text style={styles.bankText}>BANK</Text>
              </Text>
            </View>
            <Text style={styles.tagline}>Devenez millionnaire</Text>
            <Text
              style={[
                styles.tagline,
                {color: theme.textSecondary, fontSize: 18},
              ]}>
              1000 FCFA à la fois
            </Text>
          </View>

          {/* Illustration Section */}
          <View style={styles.illustrationSection}>
            <LinearGradient
              colors={[
                theme.illustrationGradientStart,
                theme.illustrationGradientEnd,
              ]}
              style={styles.familyIllustration}>
              <FontAwesomeIcon name="home" style={styles.houseIcon} />
              <Ionicons name="people-sharp" style={styles.familyIcon} />
              <Text style={styles.illustrationText}>
                Votre rêve gabonais à portée d'épargne
              </Text>
            </LinearGradient>
          </View>

          {/* Stats Section */}
          <View style={styles.statsShock}>
            <Text style={styles.statsLabel}>
              En épargnant 1000 FCFA par jour
            </Text>
            <View style={styles.amountContainer}>
              <Text style={styles.statsAmount}>365 000 FCFA</Text>
              <Animated.Text
                style={[
                  styles.sparkle,
                  {
                    transform: [
                      {scale: sparkleInterpolate},
                      {rotate: sparkleRotate},
                    ],
                  },
                ]}>
                ✨
              </Animated.Text>
            </View>
            <Text style={styles.statsSubtitle}>
              au bout d'un an seulement !
            </Text>
          </View>

          {/* Social Proof */}
          <View style={styles.socialProof}>
            <Text style={styles.proofText}>
              <Text style={styles.proofNumber}>10 000+</Text> Gabonais nous font
              déjà confiance
            </Text>
          </View>

          {/* Action Section */}
          <View style={styles.actionSection}>
            <TouchableOpacity onPress={handleContinue}>
              <LinearGradient
                colors={[theme.primary, theme.success]}
                style={styles.ctaPrimary}>
                <FontAwesomeIcon name="money" size={18} color="white" />
                <Text style={styles.ctaText}>Commencer mon épargne</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    paddingHorizontal: 24,
  },
  heroHeader: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  elephantIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    shadowColor: theme.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  appLogo: {
    fontSize: 24,
    fontFamily: 'Roboto_900Black',
    color: theme.textPrimary,
    letterSpacing: 0.5,
  },
  bankText: {
    color: theme.primary,
  },
  tagline: {
    fontSize: 22,
    fontFamily: 'Roboto_700Bold',
    color: theme.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
  },
  illustrationSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyIllustration: {
    width: 220,
    height: 180,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.1)',
  },
  houseIcon: {
    fontSize: 48,
    color: theme.primary,
    marginBottom: 8,
  },
  familyIcon: {
    fontSize: 28,
    color: theme.primary,
    marginBottom: 12,
  },
  illustrationText: {
    fontSize: 12,
    fontFamily: 'Roboto_500Medium',
    color: theme.primary,
    textAlign: 'center',
    lineHeight: 16,
  },
  statsShock: {
    alignItems: 'center',
    marginVertical: 24,
  },
  statsLabel: {
    fontSize: 16,
    color: theme.textSecondary,
    fontFamily: 'Roboto_500Medium',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsAmount: {
    fontSize: 36,
    fontFamily: 'Roboto_900Black',
    color: theme.primary,
  },
  sparkle: {
    position: 'absolute',
    right: -30,
    top: 5,
    fontSize: 20,
    marginLeft: 8,
  },
  statsSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    fontFamily: 'Roboto_500Medium',
    marginTop: 8,
  },
  socialProof: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.1)',
  },
  proofText: {
    fontSize: 14,
    color: theme.textSecondary,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center',
  },
  proofNumber: {
    color: theme.primary,
    fontFamily: 'Roboto_700Bold',
  },
  actionSection: {
    paddingBottom: 24,
  },
  ctaPrimary: {
    flexDirection: 'row',
    gap: 12,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: theme.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});

export default WelcomeScreen;
