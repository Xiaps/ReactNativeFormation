import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Legal = () => {
  return (
    <View style={styles.container}>
      <Text>Legal works</Text>
    </View>
  );
};

export default Legal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#19B5FE',
    alignItems: 'center',
  },
});
