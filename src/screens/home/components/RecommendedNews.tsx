import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StopIcon} from 'react-native-heroicons/micro';
import {NewsResponse} from '../../../type/NewsApiResponse';
import {timeAgo} from '../../../utils/Utility';
import React from 'react';

export const RecommendedNewsList = ({item}: {item: NewsResponse}) => {
  return (
    <View>
      {item.articles.map((article, idx) => (
        <View key={idx} style={styles.articleContainer}>
          <FastImage
            source={{
              uri: article.urlToImage ?? 'https://unsplash.it/400/400?image=1',
            }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.categoryText}>
              {item.category ?? 'Unknown Category'}
            </Text>
            <View style={styles.titleContainer}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                {article.title ?? 'Unknown Title'}
              </Text>
              <View style={styles.articleInfoContainer}>
                <Text style={styles.sourceText}>
                  {article.source?.name ?? 'Unknown Source'}
                </Text>
                <StopIcon color={'#969696'} size={6} />
                <Text style={styles.timeText}>
                  {timeAgo(article.publishedAt ?? '2024-10-12T10:03:10Z')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 12,
    paddingVertical: 10,
    flex: 1,
    gap: 4,
  },
  categoryText: {
    color: '#8C8C8C',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  articleInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sourceText: {
    color: '#8C8C8C',
  },
  timeText: {
    color: '#8C8C8C',
  },
});
