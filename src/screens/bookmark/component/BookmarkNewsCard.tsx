/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  BookmarkIcon,
  ArrowUpOnSquareIcon,
} from 'react-native-heroicons/outline';
import {onShare} from '../../../utils/Utility';
import {Article} from '../../../type/NewsApiResponse';
import {removeBookmark} from '../../../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../../../redux/store';

export const BookmarkNewsCard = ({
  item,
  navigation,
}: {
  item: Article;
  navigation: any;
}) => {
  const dispatch = useDispatch();

  const bookmarkedArticles = useSelector(
    (state: RootState) => state.bookmarkedArticles,
  );

  const handleRemoveBookmark = async () => {
    dispatch(removeBookmark(item.url));
    try {
      const updatedBookmarks = bookmarkedArticles.filter(
        (article: Article) => article.url !== item.url,
      );

      await AsyncStorage.setItem(
        'bookmarkedNews',
        JSON.stringify(updatedBookmarks),
      );
    } catch (error) {
      console.log('Error updating storage:', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NewsDetailsScreen', {
          newsCategory: item?.category ?? 'Unknown Category',
          newsData: item,
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
            uri: item?.urlToImage ?? 'https://unsplash.it/400/400?image=1',
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
            {item.title}
          </Text>

          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 8,
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: '#2196F3',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}>
              <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
                {item?.category ?? ''}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  handleRemoveBookmark();
                  console.log('Bookmark this news');
                }}
                style={{
                  backgroundColor: '#000',
                  borderRadius: 1000,
                  padding: 8,
                }}>
                <BookmarkIcon color={'red'} size={15} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onShare(item?.url)}
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
