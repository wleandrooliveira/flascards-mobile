import React from 'react';
import { Platform, View} from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import { white, greenDark } from '../constants/Colors';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../reducers/index.js';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import NewDeck from '../components/NewDeck';
import ListScreen from '../screens/ListScreen';
import UniqueDeck from '../components/UniqueDeck';
import NewQuestion from '../components/NewQuestion';
import Quiz from '../components/Quiz.js'
import { setNotification } from '../utils/notifications';

const Tabs = createBottomTabNavigator({
    ListScreen: {
            screen: ListScreen,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                    />
                  ),
            },
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                      focused={focused}
                      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                    />
                  ),
            },
        },
    }
);

const AppNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {title: 'Home'},
    },
    UniqueDeck: {
        screen: UniqueDeck,
        navigationOptions: {
            headerTintColor: '#405e8e',

        },
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            title: 'Adicionar Questão',
        },
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: '#000',
        },
    },
});

export default class Navigation extends React.Component {
    componentDidMount() {
        setNotification();
    }
    render() {
        return <Provider store={createStore(reducer)}>
            <View style={{
                flex: 1
            }}>
                <AppNavigator />
            </View>
        </Provider>
    }
}