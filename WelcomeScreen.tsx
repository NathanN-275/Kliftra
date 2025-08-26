import React from 'react';
import { SafeAreaView, View, Image, Text, Pressable, StyleSheet } from 'react-native';

const BG = '#fdf2dc'; // background color

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Image
          source={require('./assets/kliftra-logo.png')} // ensure this file exists
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={{ height: 24 }} />

        <Pressable style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Log in</Text>
        </Pressable>

        <View style={{ height: 12 }} />

        <Pressable style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Create an Account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logo: { width: 300, height: 300 },
  btn: {
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    minWidth: 240,
    alignItems: 'center',
  },
  btnText: { color: 'white', fontWeight: '600' },
});
