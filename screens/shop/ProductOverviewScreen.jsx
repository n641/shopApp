import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

import ProductItem from '../../Components/shop/ProductItem'

export default function ProductOverviewScreen() {
    const products = useSelector(state => state.products.avalibleProducts)
    return (
        <FlatList data={products} keyExtractor={item => item.id}
         renderItem={itemData => <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onselect={()=>{}}/> }/>
  )
}

const styles = StyleSheet.create({})