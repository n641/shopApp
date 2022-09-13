import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import ProductItem from '../../Components/shop/ProductItem'
import * as cartAction from '../../store/actions/Cart';
import CustomHeaderButton from '../../Components/Ui/HeaderButton';


export default function ProductOverviewScreen(props) {
  const { navigation } = props;
  const products = useSelector(state => state.products.avalibleProducts)
  const cart = useSelector(state => state.cart.items)

  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="search" iconName="cart" onPress={() => {
            navigation.navigate('CART', { title: "Cart" })
          }} />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>

      )
    });
  }, [navigation]);

  return (
    <FlatList data={products} keyExtractor={item => item.id}
      renderItem={itemData =>
        <ProductItem image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            navigation.navigate('ProductDetailsScreen', { title: itemData.item.title, productId: itemData.item.id });
          }}
          AddToCart={() => {
            dispatch(cartAction.addToCart(itemData.item));
          }}
        />}


    />
  )
}

const styles = StyleSheet.create({})