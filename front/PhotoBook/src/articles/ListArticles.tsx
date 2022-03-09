import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  fetchAllArticles,
  selectAllArticles,
  selectArticleStatus,
} from '../redux/slices/articles.slice';

const ListArticles = () => {
  const dispatch = useAppDispatch();
  const articleStatus = useAppSelector(selectArticleStatus);

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  const articles = useAppSelector(selectAllArticles);

  return (
    <ScrollView style={styles.container}>
      {articleStatus === 'loading' && <ActivityIndicator />}
      {articles.map(article => {
        return (
          <View key={article.id} style={styles.post}>
            <Text>{article.content}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ListArticles;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: '#19CFFF',
  },
  post: {
    width: '100%',
    backgroundColor: 'white',
    textAlignVertical: 'top',
    borderRadius: 4,
    marginBottom: 10,
    padding: 15,
  },
});
