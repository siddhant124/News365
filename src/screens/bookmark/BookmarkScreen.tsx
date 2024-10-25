/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setBookmarks} from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Article} from '../../type/NewsApiResponse';
import {BookmarkNewsCard} from './component/BookmarkNewsCard';
import {BookmarkIcon} from 'react-native-heroicons/outline';

export default function BookmarkScreen({navigation}: {navigation: any}) {
  const dispatch = useDispatch();
  const bookmarkedArticles: Article[] = useSelector(
    (state: RootState) => state.bookmarkedArticles,
  );

  const loadBookmarkedNews = async () => {
    try {
      const storedNews = await AsyncStorage.getItem('bookmarkedNews');
      if (storedNews) {
        const parsedNews: Article[] = JSON.parse(storedNews);
        dispatch(setBookmarks(parsedNews));
      }
    } catch (error) {
      console.log('Error loading bookmarked news:', error);
    }
  };

  useEffect(() => {
    loadBookmarkedNews();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: 'black',
          padding: 24,
        }}>
        Bookmarks
      </Text>
      {bookmarkedArticles.length < 1 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}>
          <BookmarkIcon color={'gray'} size={45} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
            }}>
            Your Saved news will apear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedArticles}
          keyExtractor={item => item.url}
          renderItem={({item}) => (
            <BookmarkNewsCard item={item} navigation={navigation} />
          )}
        />
      )}
    </SafeAreaView>
  );
}
