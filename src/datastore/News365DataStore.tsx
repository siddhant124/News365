import DataStorageKeys from './DataStorageKeys';
import AsyncDataStore from './AsyncDataStore';

/**
 * Created by Anurag on 6 August 2024
 *
 * News365DataStore wrapper class responsible to store persisit data
 * in [key-value] pair for entire app data.
 */
export class News365DataStore {
  private static instance: News365DataStore;

  private constructor() {}

  static getInstance(): News365DataStore {
    if (!News365DataStore.instance) {
      News365DataStore.instance = new News365DataStore();
    }
    return News365DataStore.instance;
  }

  async setAccessToken(accessToken: string) {
    await AsyncDataStore.saveData(DataStorageKeys.accessToken, accessToken);
  }

  async getAccessToken() {
    return await AsyncDataStore.getData(DataStorageKeys.accessToken);
  }

  async removeAccessToken() {
    await AsyncDataStore.deleteData(DataStorageKeys.accessToken);
  }

  async setIsFirstLaunch(isFirstLaunch: string) {
    await AsyncDataStore.saveData(DataStorageKeys.isFirstLaunch, isFirstLaunch);
  }

  async clearData() {
    return await AsyncDataStore.clear();
  }

  async setLocalScreenUI(screenName: string, loginData: string) {
    await AsyncDataStore.saveData(screenName, loginData);
  }

  async getLocalScreenUI(screenName: string) {
    return await AsyncDataStore.getData(screenName);
  }
}
export default News365DataStore.getInstance();
