import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {ScreenProps} from '../navigation';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';
import Legal from './Legal';
import Settings from './Settings';
import Wall from './Wall';

const Home = ({navigation}: ScreenProps<'Home'>) => {
  //à chaque raffraichissement de composant

  const authentification = useAppSelector(selectAuthentication);

  useEffect(() => {
    if (authentification.user === undefined) {
      navigation.navigate('Login');
    }
  }, [navigation, authentification]);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;
          switch (route.name) {
            case 'Wall':
              iconName = 'cat';
              break;
            case 'Legal':
              iconName = 'balance-scale';
              break;
            case 'Settings':
              iconName = 'cog';
              break;
            default:
              iconName = 'cat';
              break;
          }
          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              color={color}
              type="font-awesome-5"
              tvParallaxProperties={undefined}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Wall" component={Wall} />
      <Tab.Screen name="Legal" component={Legal} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#19B5FE',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
});

export default Home;
