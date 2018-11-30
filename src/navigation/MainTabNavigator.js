import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DeckScreen from '../screens/DeckScreen';
import ListScreen from '../screens/ListScreen';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const ListStack = createStackNavigator({
  Home: ListScreen,
});


ListStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const DeckStack = createStackNavigator({
  Decks: DeckScreen,
});

DeckStack.navigationOptions = {
  tabBarLabel: 'New Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};


export default createBottomTabNavigator({
  ListStack,
  DeckStack,
});
