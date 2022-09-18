import { StyleSheet, Text, View, FlatList , Button  , Platform} from 'react-native'
import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/Ui/HeaderButton';

import ProductItem from '../../Components/shop/ProductItem'
import Colors from '../../constants/Colors';

import * as productAction from '../../store/actions/Product'

export default function UserProductScreen(props) {
    const userProduct = useSelector(state => state.products.userProduct);
    const { navigation } = props;
    const dispatch = useDispatch();

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
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Menu"
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() => {
                            navigation.navigate('EditProductScreen' , {title:"Create product"});
                        }}
                    />
                </HeaderButtons>

            )
        });
    }, [navigation]);

    return (
        <FlatList data={userProduct}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { }}
                >
                    <Button title='Edit' color={Colors.primary} onPress={()=>{
                        navigation.navigate('EditProductScreen' , {id:itemData.item.id , title:"Edite product"})
                    }}/>
                    <Button title='delete' color={Colors.primary} onPress={()=>{
                        dispatch(productAction.deleteItem(itemData.item.id))
                    }}/>

                </ProductItem>
            }
        />
    )
}

const styles = StyleSheet.create({})