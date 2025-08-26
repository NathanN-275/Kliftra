import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Image, Text, TextInput, Pressable, StyleSheet, Alert
} from 'react-native';
import { verifyResetCode, resendCode } from './authApi';

const BG = '#fdf2dc';
const CARD_BG = '#f7ead1';
const BORDER = '#cdbfa5';
const BTN = '#1f2937';

export default function ForgotVerifyScreen({ navigation, route }: any) {
  const { requestId, destination } = route.params as { requestId: string; destination: string };
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTimer(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const onVerify = async () => {
    try {
      setBusy(true);
      await verifyResetCode(requestId, code);
      navigation.replace('ForgotReset', { requestId });
    } catch (e: any) {
      Alert.alert('Invalid code', e?.message || 'Please try again');
    } finally {
      setBusy(false);
    }
  };

  const onResend = async () => {
    if (timer > 0) return;
    try {
      setBusy(true);
      await resendCode(requestId);
      setTimer(90);
      Alert.alert('Sent', `A new code was sent to ${destination}.`);
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Could not resend code');
    } finally {
      setBusy(false);
    }
  };

  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.replace('ForgotRequest');

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: BG }}>
      <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:20 }}>
        <Image source={require('./assets/kliftra-logo-only.png')} style={{ width:110, height:110, marginBottom:8 }} resizeMode="contain" />
        <Text style={{ color:'#5a4a34', fontSize:16, fontWeight:'600', marginTop:4 }}>
          Enter the 6-digit code we sent to
        </Text>
        <Text style={{ color:'#5a4a34', marginBottom:10 }}>{destination}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Verification Code</Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            placeholderTextColor="#9b8c74"
            value={code}
            onChangeText={t => setCode(t.replace(/\D/g, '').slice(0, 6))}
            keyboardType="number-pad"
            autoFocus
          />

          <Pressable style={styles.primary} onPress={onVerify} disabled={code.length !== 6 || busy}>
            <Text style={styles.primaryText}>{busy ? 'Checking…' : 'Continue'}</Text>
          </Pressable>

          <View style={{ flexDirection:'row', justifyContent:'center', marginTop:10 }}>
            <Text style={{ color:'#5a4a34', marginRight:8 }}>Didn’t get it?</Text>
            <Pressable onPress={onResend} disabled={timer > 0 || busy}>
              <Text style={[styles.link, timer > 0 && { opacity: 0.5 }]}>
                Resend {timer > 0 ? `(${timer})` : ''}
              </Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.back} onPress={goBack}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { width:'90%', backgroundColor:CARD_BG, borderRadius:10, borderWidth:1, borderColor:BORDER, padding:14 },
  label: { color:'#5a4a34', marginBottom:6, fontSize:12 },
  input: { backgroundColor:'#fff', borderRadius:6, paddingHorizontal:10, paddingVertical:10, borderWidth:1, borderColor:BORDER, letterSpacing:6, textAlign:'center', fontSize:20 },
  primary: { marginTop:12, backgroundColor: BTN, paddingVertical:12, borderRadius:8, alignItems:'center' },
  primaryText: { color:'#fff', fontWeight:'700' },
  link: { color:'#2b4a8a', textDecorationLine:'underline' },
  back: { marginTop:18, backgroundColor: BTN, paddingHorizontal:18, paddingVertical:8, borderRadius:8 },
  backText: { color:'#fff', fontWeight:'600' },
});
