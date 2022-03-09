import {is} from 'immer/dist/internal';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {api} from '../api';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  addNewArticle,
  Article,
  fetchAllArticles,
} from '../redux/slices/articles.slice';
import {selectAuthentication} from '../redux/slices/authentication.slice';

const NewArticle = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const article: Article = {
        content: text,
        images: [] as string[],
      } as Article;
      setText('');
      await api.addNewArticle(article);
      setIsLoading(false);
      dispatch(fetchAllArticles());
    } catch (err) {
      console.log('erreur : ' + err);
    }
  };

  const [text, setText] = useState('');
  const authentication = useAppSelector(selectAuthentication);

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.newPost}
        onChangeText={setText}
        value={text}
        placeholder={`Hello ${authentication.user?.displayName}, what's on your mind?`}
        placeholderTextColor="#000"
      />
      <Button title="Post" onPress={onSubmit} loading={isLoading} />
    </View>
  );
};

export default NewArticle;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  newPost: {
    width: '100%',
    backgroundColor: 'white',
    textAlignVertical: 'top',
    borderRadius: 10,
    marginBottom: 5,
  },
});
