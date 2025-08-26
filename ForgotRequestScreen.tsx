import React, { useState } from 'react';
import {
  SafeAreaView, View, Image, Text, TextInput, Pressable, StyleSheet,
  Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { requestPasswordReset } from './authApi';
const BG = '#fdf2dc';
const CARD_BG = '#f7ead1';
const BORDER = '#cdbfa5';
const BTN = '#1f2937';

export default function ForgotRequestScreen({ navigation }: any) {
  const [dest, setDest] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { requestId } = await requestPasswordReset(dest);
      navigation.navigate('ForgotVerify', { requestId, destination: dest });
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.replace('Login');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image source={require('./assets/kliftra-logo-only.png')} style={{ width: 110, height: 110, marginBottom: 8 }} resizeMode="contain" />
            <Text style={{ color: '#5a4a34', fontSize: 16, fontWeight: '600', marginTop: 4 }}>Reset Your Password</Text>
            <View style={{ width: 220, height: 1, backgroundColor: BORDER, marginTop: 6, marginBottom: 14 }} />

            <View style={styles.card}>
              <Text style={styles.label}>Email or Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor="#9b8c74"
                value={dest}
                onChangeText={setDest}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <View style={styles.row}>
                <Pressable onPress={goBack} style={[styles.smallBtn, styles.lightBtn]}>
                  <Text style={[styles.smallTxt, { color: '#111827' }]}>Cancel</Text>
                </Pressable>
                <Pressable onPress={onSubmit} disabled={!dest || loading} style={styles.smallBtn}>
                  <Text style={styles.smallTxt}>{loading ? 'Sending…' : 'Reset Password'}</Text>
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.back} onPress={goBack}>
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { width: '90%', backgroundColor: CARD_BG, borderRadius: 10, borderWidth: 1, borderColor: BORDER, padding: 14 },
  label: { color: '#5a4a34', marginBottom: 6, fontSize: 12 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,   // smaller height
    height: 44,
    borderWidth: 1,
    borderColor: BORDER,
    letterSpacing: 0,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 12 },
  smallBtn: { backgroundColor: BTN, paddingVertical: 10, borderRadius: 8, alignItems: 'center', flexBasis: '48%' },
  lightBtn: { backgroundColor: '#e5e7eb' },
  smallTxt: { color: '#fff', fontWeight: '700' },
  back: { marginTop: 18, backgroundColor: BTN, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8 },
  backText: { color: '#fff', fontWeight: '600' },
});
