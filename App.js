import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import RemoteTodoScreen from './src/screens/RemoteTodoScreen';
import LocalTodoScreen from './src/screens/LocalTodoScreen';
import TodoDetailScreen from './src/screens/TodoDetailScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs(['Please report: Excessive number of pending callbacks']);

const MainStack = createStackNavigator();
const LocalStack = createStackNavigator();
const RemoteStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();

const MainStackScreen = () => (
  <BottomTab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: {height: '8%', backgroundColor: 'white'},
    }}
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        let iconName;

        if (route.name === 'local') {
          iconName = focused ? 'home-sharp' : 'home-outline';
        } else if (route.name === 'remote') {
          iconName = focused ? 'cloud-done-sharp' : 'cloud-done-outline';
        }

        return <Ionicons name={iconName} size={50} color="#740b45" />;
      },
      showLable: false,
      tabBarActiveTintColor: '#740b45',
      tabBarInactiveTintColor: 'gray',
    })}>
    <BottomTab.Screen name="local" component={LocalStackScreen} />
    <BottomTab.Screen name="remote" component={RemoteStackScreen} />
  </BottomTab.Navigator>
);

const LocalStackScreen = () => (
  <LocalStack.Navigator>
    <LocalStack.Screen name="Home" component={LocalTodoScreen} />
    <LocalStack.Screen name="details" component={TodoDetailScreen} />
  </LocalStack.Navigator>
);

const RemoteStackScreen = () => (
  <RemoteStack.Navigator screenOptions={{headerShown: false}}>
    <RemoteStack.Screen name="Remote Todo" component={RemoteTodoScreen} />
  </RemoteStack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          <MainStack.Screen name="login" component={LoginScreen} />
          <MainStack.Screen name="main" component={MainStackScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
