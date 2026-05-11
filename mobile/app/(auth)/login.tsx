import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { api } from '../../src/services/api';
import { useAuth } from '../../src/store/authStore';
export default function Login() {
  const [id, setId] = useState(''); const [pass, setPass] = useState('');
  const router = useRouter(); const { setUser, setToken } = useAuth();
  const login = async () => {
    try {
      const { data } = await api.post('/auth/login', { identifier: id, password: pass });
      if (data.requiresOtp) return Alert.alert('OTP Required', 'Enter OTP in the prompt', [{ text: 'OK' }]);
      setToken(data.token); setUser(data.user);
      router.replace('/(tabs)');
    } catch (e: any) { Alert.alert('Error', e.response?.data?.error || 'Login failed'); }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Phone/Email" value={id} onChangeText={setId} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={pass} onChangeText={setPass} />
      <Button title="Login" onPress={login} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' }, title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }, input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 } });