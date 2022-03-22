import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, {Marker, ProviderPropType} from 'react-native-maps';

import MapScreen from './screen/MapScreen';
import CityListScreen from './screen/ListScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListCity">
        <Stack.Screen name="ListCity" component={CityListScreen} />
        <Stack.Screen name="Map" component={MapScreen}  options={({ route }) => ({ title: route.params.item.city })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;