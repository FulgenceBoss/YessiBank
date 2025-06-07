import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../constants/colors';
import {FONT_SIZES, FONT_WEIGHTS} from '../../constants/typography';

const ElephantIcon = () => (
  <View style={styles.iconContainer}>
    <Svg height="24" width="24" viewBox="0 0 512 512">
      <Path
        fill={COLORS.primary}
        d="M448 224C448 195.6 426.9 172.4 400 168.1V128C400 92.68 371.3 64 336 64H176C140.7 64 112 92.68 112 128V168.1C85.08 172.4 64 195.6 64 224V288C64 323.3 92.67 352 128 352V416C128 433.7 142.3 448 160 448C177.7 448 192 433.7 192 416V352H224V416C224 433.7 238.3 448 256 448C273.7 448 288 433.7 288 416V352H320V416C320 433.7 334.3 448 352 448C369.7 448 384 433.7 384 416V352C419.3 352 448 323.3 448 288V224zM160 128C160 119.2 167.2 112 176 112H336C344.8 112 352 119.2 352 128V192H160V128z"
      />
    </Svg>
  </View>
);

const Logo = () => {
  return (
    <View style={styles.container}>
      <ElephantIcon />
      <Text style={styles.logoText}>
        <Text>YESSI-YESSI </Text>
        <Text style={styles.bankText}>BANK</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 8,
    marginRight: 10,
    transform: [{scaleX: -1}], // Retourner l'icône pour qu'elle regarde vers le texte
  },
  logoText: {
    fontSize: FONT_SIZES.h2,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  bankText: {
    color: COLORS.primary,
  },
});

export default Logo;
