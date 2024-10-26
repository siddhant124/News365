/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MagnifyingGlassIcon} from 'react-native-heroicons/mini';
import {XCircleIcon} from 'react-native-heroicons/solid';
import {DocumentMagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {ActivityIndicator} from 'react-native-paper';
import {debounce} from 'lodash';
import FastImage from 'react-native-fast-image';
import {Article} from '../type/NewsApiResponse';
import NewsViewModel from '../api/viewmodel/NewsViewModel';

const Separator = React.memo(() => <View style={styles.separator} />);

const EmptyState = React.memo(() => (
  <View style={styles.centerContent}>
    <DocumentMagnifyingGlassIcon color={'gray'} size={45} />
    <Text style={{textAlign: 'center', fontSize: 15}}>
      Searched news will appear here
    </Text>
  </View>
));

const LoadingState = React.memo(() => (
  <View style={styles.centerContent}>
    <ActivityIndicator color="black" size={'large'} />
  </View>
));

const NewsItem = React.memo(
  ({item, onPress}: {item: Article; onPress: () => void}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.newsItemContainer}>
      <FastImage
        source={{
          uri: item?.urlToImage ?? 'https://unsplash.it/400/400?image=1',
        }}
        resizeMode="cover"
        style={styles.newsImage}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.newsTitle}>
          {item.title ?? 'Title not available'}
        </Text>
      </View>
    </TouchableOpacity>
  ),
);

export default function DiscoverScreen({navigation}: {navigation: any}) {
  const [searchedText, setSearchedText] = useState('');
  const [newsList, setNewsList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // Page state for pagination
  const [maxNewsCount, setMaxNewsCount] = useState(0);
  const newsViewModel = useMemo(() => new NewsViewModel(), []);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (text: string, page = 1) => {
        try {
          if (text.trim() === '') {
            setNewsList([]);
            return;
          }
          setIsLoading(true);
          const response = await newsViewModel.searchNews(text, page);
          setNewsList(prevList => [
            ...prevList,
            ...(response?.body?.articles ?? []),
          ]);
          setMaxNewsCount(
            response?.body?.totalResults
              ? Math.min(response.body.totalResults, 100)
              : 0,
          );
        } catch (error) {
          console.error('Error fetching News:', error);
          setNewsList([]);
        } finally {
          setIsLoading(false);
        }
      }, 1000),
    [newsViewModel],
  );

  const handleInputChange = useCallback(
    (text: string) => {
      setSearchedText(text);
      setNewsList([]); // Reset news list for a new search
      setPage(1); // Reset page for a new search
      debouncedSearch(text, 1);
    },
    [debouncedSearch],
  );

  const clearSearch = useCallback(() => {
    setSearchedText('');
    setNewsList([]);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);
    debouncedSearch(searchedText, nextPage);
  }, [debouncedSearch, page, searchedText]);

  const renderNewsItem: ListRenderItem<Article> = useCallback(
    ({item}) => (
      <NewsItem
        item={item}
        onPress={() =>
          navigation.navigate('NewsDetailsScreen', {
            newsCategory: item?.category?.toUpperCase() ?? 'Unknown Category',
            newsData: item,
          })
        }
      />
    ),
    [navigation],
  );

  const keyExtractor = useCallback(
    (item: Article) => `${Date.now()}-${Math.random()}-${item.title}`,
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>News from all around the world</Text>
        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon color="#999" />
          <TextInput
            value={searchedText}
            onChangeText={handleInputChange}
            placeholder="Search news here..."
            cursorColor="#0B86E7"
            placeholderTextColor="#999"
            style={styles.searchInput}
            returnKeyType="search"
          />
          {searchedText.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <XCircleIcon color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {isLoading && page === 1 ? (
          <LoadingState />
        ) : (
          <View style={styles.newsListContainer}>
            {newsList.length < 1 ? (
              <EmptyState />
            ) : (
              <View style={{flex: 1}}>
                <View style={styles.searchResultText}>
                  <View style={{flexDirection: 'row'}}>
                    <Text numberOfLines={1}>Showing Result for: </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: 'blue',
                        fontWeight: 'bold',
                      }}>
                      {searchedText}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                    numberOfLines={1}>
                    Showing {newsList.length} of {maxNewsCount}
                  </Text>
                </View>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={newsList}
                  renderItem={renderNewsItem}
                  keyExtractor={keyExtractor}
                  ItemSeparatorComponent={Separator}
                  removeClippedSubviews={true}
                  maxToRenderPerBatch={10}
                  windowSize={5}
                  ListFooterComponent={() =>
                    !(maxNewsCount === newsList.length) &&
                    (isLoading ? (
                      <View
                        style={{
                          alignItems: 'center',
                          marginVertical: 14,
                        }}>
                        <ActivityIndicator color="black" />
                      </View>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={loadMore}
                        style={styles.loadMoreButton}>
                        <Text style={styles.loadMoreText}>Load More</Text>
                      </TouchableOpacity>
                    ))
                  }
                  initialNumToRender={10}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: '#FFF',
    borderRadius: 999,
    elevation: 3,
    height: 40,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
    marginLeft: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  newsListContainer: {
    flex: 1,
    marginTop: 12,
    backgroundColor: '#FFF',
  },
  searchResultText: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 18,
    justifyContent: 'space-between',
  },
  newsItemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  newsImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  loadMoreButton: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#F7F7F6',
    borderRadius: 999,
    borderWidth: 0.5,
    marginVertical: 14,
    borderColor: 'black',
  },
  loadMoreText: {
    fontWeight: 'bold',
    color: 'black',
  },
});
