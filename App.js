import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/Login';
import RegistrationScreen from './src/Registration';




const AppStack = createStackNavigator({ 
  Login:LoginScreen,
  Registration:RegistrationScreen,
},
{
  initialRouteName: 'Login',
  headerMode: 'none',
}
);



export default createAppContainer(AppStack);