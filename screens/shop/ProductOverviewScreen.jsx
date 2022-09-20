import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState , useCallback } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import ProductItem from '../../Components/shop/ProductItem'
import * as cartAction from '../../store/actions/Cart';
import * as productAction from '../../store/actions/Product';
import CustomHeaderButton from '../../Components/Ui/HeaderButton';

import Colors from '../../constants/Colors'



export default function ProductOverviewScreen(props) {
  const [isLoading, setisLoading] = useState(false);
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
  console.log("s;dlfk")

  const loadProduct =useCallback( async () => {
    setisLoading(true)
    await dispatch(productAction.fetchProduct());
    setisLoading(false);
  })

  useEffect(()=>{
   const willfocus= navigation.addListener('willFocus' , loadProduct) //reload after focuse in screen in drawer navigation
  //  return()=>{
  //   willfocus.remove();  //error
  //  }
  },[loadProduct])

  useEffect(() => {
    
    loadProduct();
  }, [dispatch])


  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <FlatList data={products} keyExtractor={item => item.id}
      renderItem={itemData =>
        <ProductItem image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            navigation.navigate('ProductDetailsScreen', { title: itemData.item.title, productId: itemData.item.id });
          }}
        // AddToCart={() => {
        //   dispatch(cartAction.addToCart(itemData.item));
        // }}
        >
          <Button title='addToCart' color={Colors.primary} onPress={() => {
            dispatch(cartAction.addToCart(itemData.item));
          }} />

        </ProductItem>
      }

    />
  )
}

const styles = StyleSheet.create({})