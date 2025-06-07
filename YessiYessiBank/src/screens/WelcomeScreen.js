import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {COLORS} from '../constants/colors';
import {TEXT_STYLES, FONT_WEIGHTS, FONT_SIZES} from '../constants/typography';
import CustomButton from '../components/ui/CustomButton';
import Logo from '../components/ui/Logo';

// Une petite icône simple pour la carte. On pourrait les rendre plus complexes plus tard.
const HouseIcon = () => <Text style={styles.cardIcon}>🏠</Text>;
const FamilyIcon = () => <Text style={styles.cardIcon}>👨‍👩‍👧‍👦</Text>;

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        <Logo />

        <Text style={styles.title}>
          Devenez <Text style={{color: COLORS.primary}}>millionnaire</Text>
        </Text>
        <Text style={styles.subtitle}>1000 FCFA à la fois</Text>

        <View style={styles.card}>
          <HouseIcon />
          <FamilyIcon />
          <Text style={styles.cardText}>
            Votre rêve gabonais à portée d'épargne
          </Text>
        </View>

        <View style={styles.savingsInfoContainer}>
          <Text style={styles.savingsText}>
            En épargnant 1000 FCFA par jour
          </Text>
          <Text style={styles.savingsAmount}>365 000 FCFA ✨</Text>
          <Text style={styles.savingsText}>au bout d'un an seulement !</Text>
        </View>

        <View style={styles.testimonialCard}>
          <View>
            <Text style={styles.testimonialNumber}>10 000+</Text>
            <Text style={styles.testimonialText}>
              Gabonais nous font déjà confiance
            </Text>
          </View>
        </View>

        <CustomButton
          title="COMMENCER MON ÉPARGNE"
          onPress={() => navigation.navigate('Auth')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  title: {
    ...TEXT_STYLES.h1,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    ...TEXT_STYLES.body,
    fontSize: FONT_SIZES.large,
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    fontSize: 40,
  },
  cardText: {
    ...TEXT_STYLES.body,
    marginTop: 10,
    textAlign: 'center',
  },
  savingsInfoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  savingsText: {
    ...TEXT_STYLES.body,
    color: COLORS.textSecondary,
  },
  savingsAmount: {
    ...TEXT_STYLES.h1,
    color: COLORS.primary,
    marginVertical: 5,
  },
  testimonialCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  testimonialNumber: {
    fontSize: FONT_SIZES.h2,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  testimonialText: {
    ...TEXT_STYLES.body,
    color: COLORS.text,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
});

export default WelcomeScreen;
