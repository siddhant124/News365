/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BellIcon} from 'react-native-heroicons/outline';
import {Text, View, ActivityIndicator, FlatList} from 'react-native';
import BasicCarousel from 'react-native-sg-basic-carousel';
import NewsViewModel from '../../api/viewmodel/NewsViewModel';
import {category} from '../../type/Datatype';
import {NewsResponse} from '../../type/NewsApiResponse';
import {styles} from './HomeScreenStyle';
import {CarouselCard} from './components/CarouselCard';
import {RecommendedNewsList} from './components/RecommendedNews';

export default function HomeScreen() {
  const [newsCarouselData, setNewsCarouselData] = useState<NewsResponse[]>([]);
  const [popularNewsData, setPopularNewsData] = useState<NewsResponse[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const newsViewModel = new NewsViewModel();
    const tempData: NewsResponse[] = [];
    const tempDataForPopularNews: NewsResponse[] = [];

    try {
      // Use Promise.all to fetch data concurrently for each category
      await Promise.all(
        category.map(async cat => {
          // Fetch both regular and popular news concurrently
          const [response, popularNewsResp] = await Promise.all([
            newsViewModel.fetchNewsByCategory(cat),
            newsViewModel.fetchNewsListByPopularoty(cat),
          ]);

          // Process regular news response
          if (response.body) {
            tempData.push({
              category: cat,
              articles: response.body.articles,
              status: response.body.status,
              totalResults: response.body.totalResults,
            });
          }

          // Process popular news response
          if (popularNewsResp.body) {
            tempDataForPopularNews.push({
              category: cat,
              articles: popularNewsResp.body.articles,
              status: popularNewsResp.body.status,
              totalResults: popularNewsResp.body.totalResults,
            });
          }
        }),
      );

      // Update state with fetched data
      setNewsCarouselData(tempData);
      setPopularNewsData(tempDataForPopularNews);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center', // Centers vertically
          alignItems: 'center', // Centers horizontally
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.parentView}>
        <View style={styles.headerContainer}>
          <View style={styles.bellIconContainer}>
            <BellIcon color={'#000'} size={20} />
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Breaking News</Text>
            <Text style={styles.headerViewAll}>View all</Text>
          </View>
        </View>

        <BasicCarousel
          data={newsCarouselData}
          renderItem={item => <CarouselCard article={item} />}
        />

        {/* Recommended News Section */}
        <View style={styles.recommendedSectionView}>
          <View style={styles.recommendedHeaderContainerStyle}>
            <Text style={styles.recommendedHeading}>Recommendations</Text>
            <Text style={styles.headerViewAll}>View all</Text>
          </View>

          {/* Wrap the FlatList in a container */}
          <View style={{flex: 1}}>
            <FlatList
              data={popularNewsData}
              showsVerticalScrollIndicator={false}
              renderItem={RecommendedNewsList}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
