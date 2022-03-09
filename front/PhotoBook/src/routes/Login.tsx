import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {api} from '../api';
import {Credentials} from '../interfaces/Credentials';
import {ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
} from '../redux/slices/authentication.slice';

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
      email: 'jlg@jlg.com',
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
    <View style={styles.container}>
      <Text style={styles.appName}>PhotoBook</Text>
      <Text style={styles.signIn}>Sign in :</Text>
      <Controller
        control={control}
        rules={{
          required: 'Email required',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please enter a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            errorStyle={{color: 'red'}}
            errorMessage={errors.email && errors.email.message}
            autoCompleteType={undefined}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            errorStyle={{color: 'red'}}
            errorMessage={errors.password && 'Error format'}
            autoCompleteType={undefined}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />

      <Button
        title="Connect"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        buttonStyle={styles.button}
      />
      {errorMessage !== '' && <Text>Error : {errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {color: 'white', backgroundColor: '#C0C0C050'},
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#19B5FE',
  },
  appName: {
    fontSize: 50,
    marginBottom: 150,
    color: 'white',
  },
  button: {
    marginTop: 30,
  },
  signIn: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
    textDecorationLine: 'underline',
  },
});

export default Login;
