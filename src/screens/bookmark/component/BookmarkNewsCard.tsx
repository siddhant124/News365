/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  BookmarkIcon,
  ArrowUpOnSquareIcon,
} from 'react-native-heroicons/outline';
import {onShare} from '../../../utils/Utility';
import {Article} from '../../../type/NewsApiResponse';
import {addBookmark, removeBookmark} from '../../../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../../../redux/store';

export const BookmarkNewsCard = ({
  newsArticle,
  navigation,
  newsCategory,
}: {
  newsArticle: Article;
  navigation: any;
  newsCategory?: string;
}) => {
  const dispatch = useDispatch();
  // Get bookmarked articles from Redux
  const bookmarkedArticles = useSelector(
    (state: RootState) => state.bookmarkedArticles,
  );

  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if the news article is bookmarked
  useEffect(() => {
    const checkIfBookmarked = bookmarkedArticles.some(
      (article: Article) => article.url === newsArticle.url,
    );
    setIsBookmarked(checkIfBookmarked);
  }, [bookmarkedArticles, newsArticle.url]);

  const handleToggleBookmark = async () => {
    if (isBookmarked) {
      dispatch(removeBookmark(newsArticle.url));
    } else {
      dispatch(addBookmark({...newsArticle, category: newsCategory}));
    }
    setIsBookmarked(!isBookmarked);

    // Update AsyncStorage
    try {
      const storedNews = await AsyncStorage.getItem('bookmarkedNews');
      let parsedNews: Article[] = storedNews ? JSON.parse(storedNews) : [];

      if (isBookmarked) {
        // Remove from bookmarks
        parsedNews = parsedNews.filter(
          article => article.url !== newsArticle.url,
        );
      } else {
        // Add to bookmarks
        parsedNews.push(newsArticle);
      }

      await AsyncStorage.setItem('bookmarkedNews', JSON.stringify(parsedNews));
    } catch (error) {
      console.log('Error updating storage:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NewsDetailsScreen', {
          newsCategory: newsArticle.category,
          newsData: newsArticle,
        })
      }
      activeOpacity={0.6}
      style={{
        marginHorizontal: 24,
        marginBottom: 30,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5, // Shadow for Android
          overflow: 'hidden',
        }}>
        <FastImage
          source={{
            uri:
              newsArticle?.urlToImage ?? 'https://unsplash.it/400/400?image=1',
          }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        <View
          style={{
            padding: 10,
            backgroundColor: '#FFF',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          <Text
            numberOfLines={3}
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {newsArticle.title}
          </Text>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 8,
              justifyContent: 'space-between',
              width: '100%',
            }}>
            {newsArticle?.category && (
              <View
                style={{
                  backgroundColor: '#2196F3',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}>
                <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
                  {newsArticle.category.toLocaleUpperCase()}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  handleToggleBookmark();
                }}
                style={{
                  backgroundColor: '#000',
                  borderRadius: 1000,
                  padding: 8,
                }}>
                <BookmarkIcon color={isBookmarked ? 'red' : '#FFF'} size={15} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onShare(newsArticle?.url)}
                style={{
                  backgroundColor: '#000',
                  borderRadius: 1000,
                  padding: 8,
                }}>
                <ArrowUpOnSquareIcon color="#FFF" size={15} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
