import React, { useState, useEffect, useCallback , useReducer } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    Alert
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../Components/Ui/HeaderButton';

import { useSelector, useDispatch } from 'react-redux';

import * as productAction from '../../store/actions/Product'
import Input from '../../Components/Ui/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};


const EditProductScreen = (props) => {
    let prodId;
    if (props.route.params?.id) {
        const { id } = props.route.params;
        prodId = id;
    }
    const editedProduct = useSelector(state =>
        state.products.userProduct.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          title: editedProduct ? editedProduct.title : '',
          imageUrl: editedProduct ? editedProduct.imageUrl : '',
          description: editedProduct ? editedProduct.description : '',
          price: ''
        },
        inputValidities: {
          title: editedProduct ? true : false,
          imageUrl: editedProduct ? true : false,
          description: editedProduct ? true : false,
          price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
      });

    const productHandler= useCallback(()=>{  //problem not update
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
              { text: 'Okay' }
            ]);
            return;
          }
        if(editedProduct){
            dispatch(productAction.updateProduct(prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl));
            console.log("update product")
        }else{
            dispatch(productAction.createProduct( formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price))
            console.log("create product")
        }
        navigation. goBack();
    } ,[dispatch, prodId, formState])  ; 

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );
    
    const { navigation } = props;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="save"
                        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                        onPress={
                            productHandler
                        }
                    />
                </HeaderButtons>

            )
        });
    }, [navigation]);

    return (
        <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    )
}

export default EditProductScreen

const styles = StyleSheet.create({
    form: {
        margin: 20
      }
})