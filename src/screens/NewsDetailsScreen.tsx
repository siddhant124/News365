/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  ArrowUpOnSquareIcon,
} from 'react-native-heroicons/outline';
import {StopIcon} from 'react-native-heroicons/solid';
import {onShare, openLinkInBrowser, timeAgo} from '../utils/Utility';
import {Article} from '../type/NewsApiResponse';

export default function NewsDetailsScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const {newsData, newsCategory}: {newsData: Article; newsCategory: string} =
    route.params;

  const imageUri =
    newsData?.urlToImage ?? 'https://unsplash.it/400/400?image=1';
  const newsTitle = newsData?.title ?? 'Title Unavailable';
  const newsSource = newsData?.source?.name ?? 'Source Unavailable';
  const publishedTime = timeAgo(
    newsData?.publishedAt ?? '2024-10-11T17:03:49Z',
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Image overlapping the Status Bar */}
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}>
        <FastImage
          source={{uri: imageUri}}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.headerContainer}>
            {/* Back Button */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.goBack()}
              style={styles.iconButton}>
              <ArrowLeftIcon color="#FFF" size={18} />
            </TouchableOpacity>

            {/* Bookmark and Share Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => console.log('bookmark this news')}
                style={styles.iconButton}>
                <BookmarkIcon color="#FFF" size={18} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onShare(newsData?.url)}
                style={styles.iconButton}>
                <ArrowUpOnSquareIcon color="#FFF" size={18} />
              </TouchableOpacity>
            </View>
          </View>

          {/* News Information */}
          <View style={styles.newsInfoContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{newsCategory}</Text>
            </View>

            <View style={styles.newsDetails}>
              <Text style={styles.newsTitle}>{newsTitle}</Text>
              <View style={styles.newsMeta}>
                <Text style={styles.sourceText}>{newsSource}</Text>
                <View style={styles.timeContainer}>
                  <StopIcon color="#FFF" size={8} />
                  <Text style={styles.timeText}>{publishedTime}</Text>
                </View>
              </View>
            </View>
          </View>
        </FastImage>
        {/* News Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.sourceTextLarge}>{newsSource}</Text>

          <Text style={styles.descriptionText}>{newsData?.description}</Text>

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.readFullArticle}
            onPress={() => openLinkInBrowser(newsData.url)}>
            <Text style={styles.linkText}>Read full article</Text>
          </TouchableOpacity>
          <Text style={styles.authorText}>~{newsData?.author ?? ''}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    borderRadius: 0,
    justifyContent: 'space-between',
    height: '50%',
  },
  headerContainer: {
    width: '100%',
    marginTop: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#000',
    borderRadius: 1000,
    alignSelf: 'flex-start',
    padding: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  newsInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    gap: 10,
  },
  categoryBadge: {
    backgroundColor: '#2196F3',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 14,
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  newsDetails: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    gap: 8,
    paddingBottom: 30,
  },
  newsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sourceText: {
    color: 'white',
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    bottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 24,
    gap: 19,
  },
  sourceTextLarge: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: 'black',
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
  },
  readFullArticle: {
    borderRadius: 16,
    padding: 15,
    alignSelf: 'center',
    backgroundColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
  },
  authorText: {
    fontSize: 15,
    width: '100%',
    color: '#000',
    fontWeight: '600',
    fontStyle: 'italic',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
});
