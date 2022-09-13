import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import {Ionicons} from '@expo/vector-icons';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultstyle = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const ProductNavigator = () => {
  return (
    //  <NavigationContainer>
    <Stack.Navigator initialRouteName='shop'>
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

      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={({ route }) => ({ title: route.params.title, defaultstyle })}
      />

      <Stack.Screen
        name="CART"
        component={CartScreen}
        options=
        {{
          title: 'Cart',
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
    // </NavigationContainer> 
  )
}

const OrderNavigator = () => {

  return (
    <Stack.Navigator >
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
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
  )

}

const ShopNavigator = () => {
  return (
    <NavigationContainer >
      <Drawer.Navigator screenOptions={{
        headerShown: false,
        drawerType:  'slide',
      }}
      >
        <Drawer.Screen name="Home" component={ProductNavigator} 
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="md-home"
                size={size}
                color={focused ? Colors.primary : '#ccc'}
             />
          )
        }}
        />
        <Drawer.Screen name="Orders" component={OrderNavigator} 
        options={{
          title: 'Orders',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="ios-create"
                size={size}
                color={focused ? Colors.primary : '#ccc'}
             />
          )
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default ShopNavigator;

const styles = StyleSheet.create({})