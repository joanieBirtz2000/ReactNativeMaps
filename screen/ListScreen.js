import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import { getApi } from '../util/Api';
import { createTable, saveCitiesItems, deleteTable, getCityItems, getDBConnection } from '../util/Db';


function CityListScreen({ navigation }) {
  const [data, setData] = useState([]);

  const loadDataCallback = useCallback(async () => {
    try {
      // const initTodos = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
      const initTodos = await getApi();
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getCityItems(db);
      if (storedTodoItems.length) {
        setData(storedTodoItems);
      } else {
        await saveCitiesItems(db, initTodos);
        setData(initTodos);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const Item = ({ item, onPress }) => (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.titleCity}>{item.city}</Text>
        <Text style={styles.titleStade}>{item.state}</Text>
        <View style={styles.viewCoordonne}>
          <Text style={styles.textCoordonne}>Latitude: {item.latitude}</Text>
          <Text style={styles.textCoordonne}>Longitude: {item.longitude}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('Map', { item: item })}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.rank}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  containerItem: {
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 2,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'white',
  },
  titleCity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  titleStade: {
    fontSize: 15,
  },
  viewCoordonne: {
    flexDirection:'row',
  },
  textCoordonne: {
    fontSize: 10,
    marginRight: 10,
  },
});

export default CityListScreen