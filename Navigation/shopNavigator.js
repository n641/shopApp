import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'

const Stack = createNativeStackNavigator();

const defaultstyle={
    headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
}

export default function ShopNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
      name="shop" 
      component={ProductOverviewScreen} 
      options=
      {{
        title: 'All Product',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})