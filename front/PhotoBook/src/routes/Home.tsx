import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

const Home: React.FC<{
  truc: string;
}> = ({truc, children}) => {
  const [counter, setCounter] = useState(0);
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
    </View>
  );
};

export default Home;
