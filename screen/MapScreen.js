import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, {Marker, ProviderPropType} from 'react-native-maps';

function MapScreen({navigation, route}) {
  const params = route.params;
  const latitude = Number(params.item.latitude);
  const longitude = Number(params.item.longitude);
  const city = params.item.city;

    return (
      <View>
      <MapView
        style={styles.map}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={false}
        rotateEnabled={true}
        initialRegion={{
          latitude: latitude ,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          title={city}
          description="This is a description"
          coordinate={{ 
            latitude: latitude ,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,}}
        />
      </MapView>
    </View>
    );
  }

  const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '100%',
    },
  });

  export default MapScreen;