import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {api} from '../api';
import {ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
} from '../redux/slices/authentication.slice';
import {useForm, Controller} from 'react-hook-form';
import {Credentials} from '../interfaces/Credentials';

const Login = ({navigation}: ScreenProps<'Login'>) => {
  const authentication = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'toto@toto.com',
      password: 'test',
    } as Credentials,
  });

  useEffect(() => {
    if (authentication.user) {
      navigation.navigate('Home', {screen: 'Wall'});
    }
  });

  const onSubmit = async (credentials: Credentials) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await api.connect(
        credentials.email,
        credentials.password,
      );
      if (response.status != 200) {
        if (response.status === 401) {
          setErrorMessage('Bad credential');
          setIsLoading(false);
          return;
        }
        setErrorMessage('Tech Error');
        setIsLoading(false);
        return;
      }
      const user = await response.json();
      setIsLoading(false);
      dispatch(connect(user));
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Tech Error');
    }
  };

  return (
    <View>
      <Text>Login works</Text>
      <Button
        title="Connect"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
      {errorMessage !== '' && <Text>Error : {errorMessage}</Text>}
    </View>
  );
};

export default Login;
