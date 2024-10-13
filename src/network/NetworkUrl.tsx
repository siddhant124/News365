/**
 * NetworkUrl responsible for BASE URL and other API end point for Axios
 */

import News365DataStore from '../datastore/News365DataStore';

export async function getURL(endpoint: string): Promise<string> {
  const authToken = await News365DataStore.getAccessToken(); // Assuming you store a flag for login status
  return `${endpoint}${authToken ? authToken : ''}`;
}

// URLs
export const BASE_URL = 'https://newsapi.org/v2';
