import React from 'react';
import { FlatList, Text, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import  CustomHeaderButton from '../../Components/Ui/HeaderButton';


const OrdersScreen = props => {
    const {navigation}=props;

    React.useLayoutEffect(() => {
        navigation.setOptions({
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
          ),
        });
      }, [navigation]);

    const orders = useSelector(state => state.orders.orders);
    return (
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
      />
    );
  };
  export default OrdersScreen;
