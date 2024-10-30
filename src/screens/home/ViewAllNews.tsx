/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {category} from '../../type/Datatype';
import NewsViewModel from '../../api/viewmodel/NewsViewModel';
import {Article} from '../../type/NewsApiResponse';
import {ActivityIndicator} from 'react-native-paper';
import {BookmarkNewsCard} from '../bookmark/component/BookmarkNewsCard';

export default function ViewAllNews({navigation}: {navigation: any}) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [newsListresp, setNewsListResp] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const newsViewModel = new NewsViewModel();
    try {
      setIsLoading(true);
      const apiResp = await newsViewModel.getCategoryBasedNews(
        selectedFilter === 'All' ? '' : selectedFilter,
      );
      setNewsListResp(apiResp?.body?.articles ?? []);
    } catch (error) {
      console.error('Error fetching News:', error);
      setNewsListResp([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <View
        style={{
          flex: 1,
          marginVertical: 24,
        }}>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={category}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 24,
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setSelectedFilter(item)}
                style={{
                  padding: 10,
                  borderWidth: 0.5,
                  borderRadius: 999,
                  borderColor: selectedFilter === item ? '#3187A2' : 'gray',
                  backgroundColor: selectedFilter === item ? '#2196F3' : '#FFF',
                }}>
                <Text>{item.toUpperCase()}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#fff',
            }}>
            <ActivityIndicator color="black" size={'large'} />
          </View>
        ) : (
          <FlatList
            data={newsListresp}
            style={{
              marginTop: 24,
            }}
            renderItem={({item}) => (
              <BookmarkNewsCard
                newsArticle={item}
                navigation={navigation}
                newsCategory={selectedFilter}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
