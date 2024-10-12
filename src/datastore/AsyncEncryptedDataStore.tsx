import EncryptedStorage from 'react-native-encrypted-storage';

/**
 *
 * AsyncEncryptedDataStore class responsible for storing sensitive info key-value pair data in encrypted form.
 * This [react-native-encrypted-storage] is a wrapper android Android's EncryptedSharedPreference and IOS' keychain
 * */

class AsyncEncryptedDataStore {
  private static instance: AsyncEncryptedDataStore;
  private constructor() {}
  static getInstance(): AsyncEncryptedDataStore {
    if (!AsyncEncryptedDataStore.instance) {
      AsyncEncryptedDataStore.instance = new AsyncEncryptedDataStore();
    }
    return AsyncEncryptedDataStore.instance;
  }
  async saveData(key: string, value: any): Promise<void> {
    try {
      await EncryptedStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error('Failed to set item in encrypted storage');
    }
  }
  async getData(key: string): Promise<any | null> {
    try {
      const value = await EncryptedStorage.getItem(key);
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
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing data: ', error);
    }
  }
  async clear() {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      console.log('Error clearing data: ', error);
    }
  }
}
export default AsyncEncryptedDataStore.getInstance();
