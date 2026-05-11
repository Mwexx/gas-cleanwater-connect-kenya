import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { api } from '../../src/services/api';
export default function Register() {
  const [form, setForm] = useState({ phone: '', email: '', password: '', role: 'CUSTOMER' });
  const router = useRouter();
  const register = async () => {
    try { await api.post('/auth/register', form); Alert.alert('Success', 'Login to verify OTP'); router.replace('/(auth)/login'); }
    catch (e: any) { Alert.alert('Error', e.response?.data?.error); }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {Object.keys(form).filter(k=>k!=='role').map(k => (
        <TextInput key={k} style={styles.input} placeholder={k.charAt(0).toUpperCase()+k.slice(1)}
          secureTextEntry={k==='password'} onChangeText={(v)=>setForm({...form,[k]:v})} />
      ))}
      <Button title="Register" onPress={register} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' }, title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }, input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 } });