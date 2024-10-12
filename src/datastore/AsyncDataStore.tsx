import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * AsyncDataStore class responsible to store persisit data
 * in [key-value] pair. Under the hood it's using [SQLite- Android] and [manifest.json or MD5 hashed key-iOS]
 * reference - https://react-native-async-storage.github.io/async-storage/docs/advanced/where_data_stored
 */

class AsyncDataStore {
  private static instance: AsyncDataStore;
  private constructor() {}
  static getInstance(): AsyncDataStore {
    if (!AsyncDataStore.instance) {
      AsyncDataStore.instance = new AsyncDataStore();
    }
    return AsyncDataStore.instance;
  }
  async saveData(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error('Failed to set item in encrypted storage');
    }
  }
  async getData(key: string): Promise<any | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
      return null;
    }
  }
  async deleteData(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing data: ', error);
    }
  }
  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error clearing data: ', error);
    }
  }
}
export default AsyncDataStore.getInstance();
