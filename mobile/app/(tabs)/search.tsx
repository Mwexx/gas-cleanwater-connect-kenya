import { View, TextInput, FlatList, Text, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { api } from '../../src/services/api';

type BusinessResult = {
  id: string;
  name: string;
  county: string;
  town: string;
};

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BusinessResult[]>([]);

  const search = async () => {
    const { data } = await api.get<BusinessResult[]>(
      `/businesses/nearby?lat=-1.2921&lon=36.8219&type=${query.toUpperCase()}`
    );
    setResults(data);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Filter: GAS or WATER" value={query} onChangeText={setQuery} />
      <Button title="Search Nearby" onPress={search} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.county}, {item.town}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 10 },
  card: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontWeight: 'bold', fontSize: 16 },
});