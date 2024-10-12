import {Alert, Linking} from 'react-native';

/**
 * Created by Anurag on 14 June 2024
 * Utility class for common utility functions used throughout the app
 */
export default class Utility {
  regex = /^(https?:\/\/)/; // Regex to check if URL is using HTTP/HTTPS
}

/**
 * Shows an alert with the given title, message, and buttons.
 * @param title Alert title
 * @param message Alert message
 * @param buttons Alert buttons (optional)
 */
const showAlert = (
  title: string,
  message: string,
  buttons = [{text: 'OK'}],
) => {
  Alert.alert(title, message, buttons, {cancelable: false});
};

export {showAlert};

/**
 * Checks if a auth token is excluded from specific API calls.
 * @param url The URL to check
 * @returns Boolean indicating if the URL is excluded
 */
const isExcludeAPI = (url: string) => {
  return url.includes('/partners') || url.includes('/help-topics');
};

export {isExcludeAPI};

/**
 * Opens a deeplink for a given contact type (WhatsApp, email, call, or chat).
 * @param contactInfo The contact information (e.g., phone number or email)
 * @param linkType The type of contact (e.g., 'whatsapp', 'email', 'call', 'chat')
 */

export const openDeeplink = (contactInfo: string, linkType: string) => {
  const urlMap: {[key: string]: string} = {
    whatsapp: `https://wa.me/${contactInfo}`,
    email: `mailto:${contactInfo}`,
    call: `tel:${contactInfo}`,
    chat: `sms:${contactInfo}`,
    appleMap: `http://maps.apple.com/?ll=${contactInfo}`, // Apple Maps for iOS
    googleMap: `geo:${contactInfo}?q=${contactInfo}`, // Google Maps for Android
  };

  const url = urlMap[linkType];

  if (url) {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'Error',
            'An error occurred while trying to open the supported app.',
          );
        }
      })
      .catch(() =>
        Alert.alert(
          'Error',
          'An error occurred while trying to open the supported app.',
        ),
      );
  }
};
