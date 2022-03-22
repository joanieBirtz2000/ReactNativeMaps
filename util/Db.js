import {enablePromise, openDatabase , SQLiteDatabase } from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
    return openDatabase({name: 'Cities.db', location: 'default'});
  };

  const tableName = 'Cities';
  enablePromise(true);
 

  export const createTable = async (db) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          rank INT NOT NULL,
          city TEXT NOT NULL,
          latitude TEXT NOT NULL,
          longitude TEXT NOT NULL,
          state TEXT NOT NULL
      );`;
  
    await db.executeSql(query);
  };

  export const saveCitiesItems = async (db, cities) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(rank, city, latitude, longitude, state) values` +
      cities.map(i => `(${i.rank}, '${i.city}', '${i.latitude}', '${i.longitude}', '${i.state}')`).join(',');
  
    return db.executeSql(insertQuery);
  };

  export const getCityItems = async (db) => {
    try {
      const cityItems = [];
      const results = await db.executeSql(`SELECT * FROM ${tableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          cityItems.push(result.rows.item(index))
        }
      });
      return cityItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get storeItems !!!');
    }
  };

  export const deleteTable = async (db) => {
    const query = `drop table ${tableName}`;
  
    await db.executeSql(query);
  };