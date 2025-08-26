import React, { useState } from 'react';
import {
  SafeAreaView, View, Image, Text, TextInput, Pressable, StyleSheet,
  Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { resetPassword } from './authApi';

const BG = '#fdf2dc';
const CARD_BG = '#f7ead1';
const BORDER = '#cdbfa5';
const BTN = '#1f2937';

export default function ForgotResetScreen({ navigation, route }: any) {
  const { requestId } = route.params as { requestId: string };
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [busy, setBusy] = useState(false);

  const onConfirm = async () => {
    if (p1.length < 6) return Alert.alert('Password too short', 'Use at least 6 characters.');
    if (p1 !== p2) return Alert.alert('Passwords do not match', 'Please re-enter.');
    try {
      setBusy(true);
      await resetPassword(requestId, p1);
      Alert.alert('Success', 'Your password has been updated.', [
        { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) },
      ]);
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Could not reset password');
    } finally {
      setBusy(false);
    }
  };

  const goBack = () => (navigation.canGoBack() ? navigation.goBack() : navigation.replace('ForgotVerify', { requestId }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image source={require('./assets/kliftra-logo-only.png')} style={{ width: 110, height: 110, marginBottom: 8 }} resizeMode="contain" />
            <View style={{ width: 220, height: 1, backgroundColor: BORDER, marginTop: 6, marginBottom: 14 }} />

            <View style={styles.card}>
              <Text style={styles.label}>Enter Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor="#9b8c74"
                secureTextEntry
                value={p1}
                onChangeText={setP1}
              />

              <Text style={[styles.label, { marginTop: 10 }]}>Re-enter Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor="#9b8c74"
                secureTextEntry
                value={p2}
                onChangeText={setP2}
              />

              <Pressable style={styles.primary} onPress={onConfirm} disabled={busy || !p1 || !p2}>
                <Text style={styles.primaryText}>{busy ? 'Saving…' : 'Confirm'}</Text>
              </Pressable>
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
  card: { width: '90%', backgroundColor: CARD_BG, borderRadius: 10, borderWidth: 1, borderColor: BORDER, padding: 14, minHeight: 260 },
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
  primary: { marginTop: 12, backgroundColor: BTN, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  back: { marginTop: 18, backgroundColor: BTN, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8 },
  backText: { color: '#fff', fontWeight: '600' },
});
