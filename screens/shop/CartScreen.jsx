import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import React from 'react'
import { useSelector  , useDispatch} from 'react-redux'
import * as cartAction from '../../store/actions/Cart';
import * as OrderAction from '../../store/actions/Orders'


import CartItem from '../../Components/shop/CardItem'
import Colors from '../../constants/Colors'
import { Item } from 'react-navigation-header-buttons'

export default function CartScreen() {
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const cartItem = useSelector(state => {
        const transformeCartItem = [];
        for (const key in state.cart.items) {
            transformeCartItem.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        };
        return transformeCartItem;
    });

    const dispatch = useDispatch();
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total Amount :
                     <Text style={styles.amount}>${totalAmount}</Text>
                </Text>
                <Button 
                title='Order Now'
                color={Colors.accent}
                disabled={cartItem.length==0}
                onPress={()=>{
                    dispatch(OrderAction.addOrder(cartItem ,totalAmount))
                }}
                />
            </View>
            <FlatList data={cartItem} keyExtractor={item => item.productId }
             renderItem={ itemData => <CartItem quantity={itemData.item.quantity} 
             title={itemData.item.productTitle}
             amount={itemData.item.sum}
             onRemove={()=>{
                dispatch(cartAction.removeFromCart(itemData.item.productId))
             }
             }
             />}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
})