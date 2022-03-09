import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {api} from '../api';
import {ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
} from '../redux/slices/authentication.slice';

const Login = ({navigation}: ScreenProps<'Login'>) => {
  const authentication = useAppSelector(selectAuthentication);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authentication.user) {
      navigation.navigate('Home', {screen: 'Wall'});
    }
  });

  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await api.connect('jlg@jlg.com', 'mdp');
      setIsLoading(false);
      if (response.status != 200) {
        if (response.status === 401) {
          setErrorMessage('Bad credential');
          return;
        }
        setErrorMessage('Tech Error');
        return;
      }
      const user = await response.json();
      dispatch(connect(user));
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Tech Error');
    }
  };

  return (
    <View>
      <Text>Login works</Text>
      <Button title="Connect" onPress={onSubmit} />
      {isLoading && <ActivityIndicator />}
      {errorMessage !== '' && <Text>Error : {errorMessage}</Text>}
    </View>
  );
};

export default Login;
