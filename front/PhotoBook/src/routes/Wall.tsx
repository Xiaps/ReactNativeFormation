import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import NewArticle from '../articles/NewArticle';

const Wall = () => {
  return (
    <View style={styles.container}>
      <NewArticle />
    </View>
  );
};

export default Wall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19B5FE',
    alignItems: 'center',
  },
});
