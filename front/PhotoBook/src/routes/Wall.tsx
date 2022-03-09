import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Wall = () => {
  return (
    <View style={styles.container}>
      <Text>Wall works</Text>
    </View>
  );
};

export default Wall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#19B5FE',
    alignItems: 'center',
  },
});
