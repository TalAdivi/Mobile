import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from './components/mainScreen'
import BigPic from './components/bigPic'
import Favorites from './components/favorites'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: '' }} />
        <Stack.Screen name="BigPic" component={BigPic} options={{ title: 'Images Browser' }} />
        <Stack.Screen name="Favorite" component={Favorites} options={{ title: 'Favorites List' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
