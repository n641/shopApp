import { StyleSheet, Text, View , Button } from 'react-native'
import React , {useState} from 'react'

import CartItem from './CardItem'
import Colors from '../../constants/Colors'

export default function OrderItem(props) {
    const [ShowDetails, setShowDetails] = useState(false);
    const {data} = props;
  return (
    <View style={styles.orderItem}>
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>${props.amount}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button title={ShowDetails?'Hide Details':'Show Details'} color={Colors.primary} onPress={()=>setShowDetails(prev => !prev)}/>
        {ShowDetails && (
            <View style={styles.detailItems}>
                {data.map((pro ,index ) => (
                <CartItem 
                key={index}
                quantity={pro.quantity}
                title={pro.productTitle}
                amount={pro.sum}
                />
                )
                )}
            </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
      },
      summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
      },
      totalAmount: {
        fontSize: 16
      },
      date: {
        fontSize: 16,
        color: '#888'
      },
      detailItems: {
        width: '100%'
      }
})