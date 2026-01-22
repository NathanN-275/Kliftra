// CreateAccountScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

const BG = '#fdf2dc';
const CARD_BG = '#f7ead1';
const BORDER = '#cdbfa5';
const BTN = '#1f2937';

export default function CreateAccountScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const isValidPhone = (val: string) =>
    /^\+?[0-9]{7,15}$/.test(val.replace(/\D/g, ''));

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      isValidEmail(email) &&
      (phone.trim().length === 0 || isValidPhone(phone)) &&
      pw.trim().length >= 6
    );
  }, [name, email, phone, pw]);
  
  const onSubmit = () => {
    if (!isValidEmail(email)) {
        Alert.alert('Invalid email', 'Please enter a valid email address.');
        return;
      }
      if (phone && !isValidPhone(phone)) {
        Alert.alert('Invalid phone', 'Please enter a valid phone number.');
        return;
      }
      if (pw.length < 6) {
        Alert.alert('Password too short', 'Password must be at least 6 characters.');
        return;
      }
  
      Alert.alert('Account created (mock)', `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`);
  };

  const goBack = () =>
    navigation?.canGoBack() ? navigation.goBack() : navigation.replace?.('Login');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.center}>
            {/* Use the image that you actually have. If your repo has `kliftra-logo-only.png`, change it below accordingly. */}
            <Image
              source={require('./assets/kliftra-logo.png')}
              style={{ width: 120, height: 120, marginBottom: 8 }}
              resizeMode="contain"
            />

            <Text style={styles.title}>Create an Account</Text>
            <View style={styles.rule} />

            <View style={styles.card}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor="#9b8c74"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
              />

              <Text style={[styles.label, styles.topGap]}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor="#9b8c74"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
                returnKeyType="next"
              />

              <Text style={[styles.label, styles.topGap]}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor="#9b8c74"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
              />

              <Text style={[styles.label, styles.topGap]}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor="#9b8c74"
                value={pw}
                onChangeText={setPw}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={onSubmit}
              />

              <Pressable
                style={[styles.primaryBtn, !canSubmit && { opacity: 0.6 }]}
                onPress={onSubmit}
                disabled={!canSubmit}
              >
                <Text style={styles.primaryTxt}>Submit</Text>
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: BG },
  title: { color: '#5a4a34', fontSize: 16, fontWeight: '600', marginTop: 4 },
  rule: { width: 220, height: 1, backgroundColor: BORDER, marginTop: 6, marginBottom: 14 },
  card: {
    width: '90%',
    backgroundColor: CARD_BG,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
  },
  label: { color: '#5a4a34', fontSize: 12, marginBottom: 6 },
  topGap: { marginTop: 10 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    letterSpacing: 0,
  },
  primaryBtn: {
    backgroundColor: BTN,
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryTxt: { color: '#fff', fontWeight: '700' },
  back: { marginTop: 18, backgroundColor: BTN, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8 },
  backText: { color: '#fff', fontWeight: '600' },
});
