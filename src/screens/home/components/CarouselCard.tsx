import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StopIcon} from 'react-native-heroicons/micro';
import {NewsResponse} from '../../../type/NewsApiResponse';
import {timeAgo} from '../../../utils/Utility';
import {styles} from '../HomeScreenStyle';
import React from 'react';

// Memoized CarouselCard component to prevent unnecessary re-renders
export const CarouselCard = React.memo(
  ({article, navigation}: {article: NewsResponse; navigation: any}) => {
    const articleDetails = article.articles[0];
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('NewsDetailsScreen', {
            newsCategory: article?.category?.toUpperCase(),
            newsData: articleDetails,
          })
        }
        style={styles.cardContainer}>
        <FastImage
          source={{
            uri:
              articleDetails?.urlToImage ??
              'https://unsplash.it/400/400?image=1',
          }}
          style={styles.imageBackground}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {article.category?.toUpperCase()}
            </Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.sourceTimeContainer}>
              <Text style={styles.sourceText}>
                {articleDetails?.source?.name ?? 'Title Unavailable'}
              </Text>
              <View style={styles.timeContainer}>
                <StopIcon color={'#FFF'} size={8} />
                <Text style={styles.timeText}>
                  {timeAgo(
                    articleDetails?.publishedAt ?? '2024-10-11T17:03:49Z',
                  )}
                </Text>
              </View>
            </View>
            <Text numberOfLines={2} style={styles.titleText}>
              {articleDetails?.title ?? 'Title Unavailable'}
            </Text>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  },
);
