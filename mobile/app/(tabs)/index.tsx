import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { api } from '../../src/services/api';
import { Linking } from 'react-native';
export default function MapScreen() {
  const [loc, setLoc] = useState<{latitude:number,longitude:number}|null>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  useEffect(() => {
    (async()=>{
      const { status } = await Location.requestForegroundPermissionsAsync();
      if(status==='granted'){
        const p = await Location.getCurrentPositionAsync({});
        setLoc({latitude: p.coords.latitude, longitude: p.coords.longitude});
        const { data } = await api.get('/businesses/nearby', { params: { lat: p.coords.latitude, lon: p.coords.longitude } });
        setBusinesses(data);
      }
    })();
  },[]);
  if(!loc) return <ActivityIndicator size="large" style={{marginTop:100}}/>;
  return (
    <MapView style={styles.map} initialRegion={{...loc, latitudeDelta:0.05, longitudeDelta:0.05}}>
      {businesses.map(b=>(
        <Marker key={b.id} coordinate={{latitude:b.latitude, longitude:b.longitude}}>
          <Callout onPress={()=>b.whatsapp && Linking.openURL(`https://wa.me/${b.whatsapp.replace(/\s/g,'')}`)}>
            <View><Text style={{fontWeight:'bold'}}>{b.name}</Text><Text>{b.type} • {b.town}</Text><Text style={{color:'green'}}>Open WhatsApp</Text></View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}
const styles = StyleSheet.create({ map: { flex: 1 } });