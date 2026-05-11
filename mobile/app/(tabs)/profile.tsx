import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../src/store/authStore';
import { useRouter } from 'expo-router';
export default function Profile() {
  const { user, setUser, setToken } = useAuth(); const router = useRouter();
  const logout = () => { setUser(null); setToken(null); router.replace('/(auth)/login'); };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Phone: {user?.phone}</Text>
      <Text>Role: {user?.role}</Text>
      <Button title="Logout" onPress={logout} color="red" />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }, title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 } });