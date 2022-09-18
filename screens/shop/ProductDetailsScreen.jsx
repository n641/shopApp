import { StyleSheet, Text, View , ScrollView , Button , Image } from 'react-native'
import React from 'react'


import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors'


export default function ProductDetailsScreen(props) {
    const {navigation}=props;  
    const { productId } = props.route.params;
    const selectedProduct = useSelector(state => state.products.avalibleProducts.find(prod => prod.id === productId))

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button onPress={() => {}} title="Update count" />
        ),
      });
    }, [navigation]);
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});
