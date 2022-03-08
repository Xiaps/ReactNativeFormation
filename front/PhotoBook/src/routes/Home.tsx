import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';

const Home: React.FC<{
  truc: string;
}> = ({truc, children}) => {
  const [counter, setCounter] = useState(0);

  //à chaque raffraichissement de composant
  useEffect(() => {
    console.log('coucou');
  }, []);

  return (
    <View>
      <Text>Home works with {truc}</Text>
      {children}
      <Text>Counter = {counter}</Text>
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

export default Home;
