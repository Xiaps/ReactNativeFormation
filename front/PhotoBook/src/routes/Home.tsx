import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';

const Home: React.FC<{
  truc: string;
}> = ({truc, children}) => {
  const [counter, setCounter] = useState(0);

  //à chaque raffraichissement de composant
  useEffect(() => {
    console.log('Init du comp');
    return () => {
      console.log('destroy');
    };
  }, []);

  if (counter > 15) {
    throw new Error('oups. Counter is too big.');
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          console.log('you clicked here');
        }}>
        <Text>Home works with {truc}</Text>
      </TouchableHighlight>
      {children}
      <Text>Counter = {counter}</Text>
      <Image
        style={styles.image}
        source={require('../../assets/logo.png')}></Image>
      <Button
        title="Incremente"
        onPress={() => {
          setCounter(counter + 1);
        }}></Button>
      <Toto
        counter={counter}
        decrement={() => {
          setCounter(counter - 1);
        }}
      />
    </View>
  );
};

const Toto: React.FC<{
  counter: number;
  decrement: () => void;
}> = ({counter, decrement}) => {
  return (
    <>
      <Text>coucou toto {counter}</Text>
      <Button title="decrement" onPress={decrement} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
});

export default Home;
