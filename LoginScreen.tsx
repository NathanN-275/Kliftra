import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const BG = '#fdf2dc';
const CARD_BG = '#f7ead1';
const BORDER = '#cdbfa5';
const BTN = '#1f2937';

export default function LoginScreen({ navigation }: any) {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');

  const canSubmit = user.trim().length > 0 && pw.trim().length > 0;

  const handleSignIn = useCallback(() => {
    if (!canSubmit) {
      Alert.alert('Missing info', 'Please enter both username and password.');
      return;
    }
    Alert.alert('Sign in', 'Hook up auth later');
    // TODO: call your auth API here
  }, [canSubmit]);

  const goBack = () =>
    navigation?.canGoBack() ? navigation.goBack() : navigation.replace?.('Welcome');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
              {/* NOTE: Adjust the path below to match your project structure */}
              <Image
                source={require('./assets/kliftra-logo-only.png')}
                style={{ width: 110, height: 110, marginBottom: 8 }}
                resizeMode="contain"
              />

              <Text style={{ color: '#5a4a34', fontSize: 16, fontWeight: '600', marginTop: 4 }}>
                User Login
              </Text>
              <View
                style={{ width: 160, height: 1, backgroundColor: BORDER, marginTop: 6, marginBottom: 10 }}
              />

              <View style={styles.card}>
                <Text style={styles.label}>Username, Email or Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Value"
                  placeholderTextColor="#9b8c74"
                  value={user}
                  onChangeText={setUser}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="username"
                  autoComplete="username"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    // @ts-ignore: focusing by ref is optional; users can tap into the next field
                  }}
                />

                <Text style={[styles.label, { marginTop: 10 }]}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Value"
                  placeholderTextColor="#9b8c74"
                  value={pw}                 // <-- uses pw state
                  onChangeText={setPw}       // <-- updates pw state
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  autoComplete="password"
                  returnKeyType="done"
                  onSubmitEditing={handleSignIn}
                />

                <Pressable
                  style={[styles.primary, { opacity: canSubmit ? 1 : 0.6 }]}
                  onPress={handleSignIn}
                  disabled={!canSubmit}
                >
                  <Text style={styles.primaryText}>Sign In</Text>
                </Pressable>

                <Pressable onPress={() => navigation?.navigate?.('ForgotRequest')}>
                  <Text style={styles.link}>Forgot password?</Text>
                </Pressable>
              </View>

              <Pressable style={styles.back} onPress={goBack}>
                <Text style={styles.backText}>Back</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: CARD_BG,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
  },
  label: { color: '#5a4a34', marginBottom: 6, fontSize: 12 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8, // smaller height
    height: 44, // consistent tighter box
    borderWidth: 1,
    borderColor: BORDER,
    letterSpacing: 0, // ensure no spaced letters
  },
  primary: {
    marginTop: 12,
    backgroundColor: BTN,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  link: {
    color: '#2b4a8a',
    marginTop: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
  },
  back: {
    marginTop: 18,
    backgroundColor: BTN,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backText: { color: '#fff', fontWeight: '600' },
});
