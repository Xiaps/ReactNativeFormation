import {
    createNativeStackNavigator,
    NativeStackScreenProps,
  } from '@react-navigation/native-stack';
  
  export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Legal: undefined;
    Settings: undefined;
  };
  
  export const Stack = createNativeStackNavigator<RootStackParamList>();
  
  export type ScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;