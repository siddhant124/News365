/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BellIcon} from 'react-native-heroicons/outline';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import BasicCarousel from 'react-native-sg-basic-carousel';
import NewsViewModel from '../../api/viewmodel/NewsViewModel';
import {category} from '../../type/Datatype';
import {NewsResponse} from '../../type/NewsApiResponse';
import {styles} from './HomeScreenStyle';
import {CarouselCard} from './components/CarouselCard';
import {RecommendedNewsList} from './components/RecommendedNews';
import {ArrowPathIcon, FaceFrownIcon} from 'react-native-heroicons/outline';

export default function HomeScreen({navigation}: {navigation: any}) {
  const {width: screenWidth} = Dimensions.get('window');

  const [newsCarouselData, setNewsCarouselData] = useState<NewsResponse[]>([]);
  const [popularNewsData, setPopularNewsData] = useState<NewsResponse[]>([]);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);

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

          if (response?.successStatus?.isSuccessful === false) {
            setIsLimitReached(true);
          } else {
            setIsLimitReached(false);
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
            // Update state with fetched data
            setNewsCarouselData(tempData);
            setPopularNewsData(tempDataForPopularNews);
          }
        }),
      );
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isLimitReached) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FaceFrownIcon color={'#000'} size={56} />
        <Text
          style={{
            textAlign: 'center',
            padding: 24,
            fontSize: 18,
            color: '#000',
            fontStyle: 'italic',
          }}>
          You have made too many requests recently. Developer accounts are
          limited to 100 requests over a 24 hour period (50 requests available
          every 12 hours). Please upgrade to a paid plan if you need more
          requests.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.parentView}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: 14,
          }}>
          <Text style={styles.headerTitle}>Breaking News</Text>
          <View style={styles.bellIconContainer}>
            <BellIcon
              style={{
                alignSelf: 'flex-end',
              }}
              color={'#000'}
              size={20}
            />
          </View>
        </View>

        {newsCarouselData?.length > 0 ? (
          <BasicCarousel
            data={newsCarouselData}
            renderItem={item => (
              <CarouselCard article={item} navigation={navigation} />
            )}
          />
        ) : (
          <View
            style={{
              width: screenWidth * 0.9,
              height: 200,
              marginHorizontal: screenWidth * 0.05,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              padding: 1,
              borderWidth: 0.5,
              gap: 8,
              overflow: 'hidden',
            }}>
            <ArrowPathIcon color={'#000'} />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'gray',
                fontSize: 15,
              }}>
              Failed to fetch news
            </Text>
          </View>
        )}

        {/* Recommended News Section */}
        <View style={styles.recommendedSectionView}>
          <View style={styles.recommendedHeaderContainerStyle}>
            <Text style={styles.recommendedHeading}>Recommendations</Text>
            <Text
              onPress={() => {
                navigation.navigate('ViewAllNews');
              }}
              style={styles.headerViewAll}>
              View all
            </Text>
          </View>

          {/* Wrap the FlatList in a container */}
          <View style={{flex: 1}}>
            <FlatList
              data={popularNewsData}
              scrollEnabled={false}
              renderItem={({item}) => (
                <RecommendedNewsList item={item} navigation={navigation} />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
