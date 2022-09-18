import PRODUCTS from '../../data/dummuy-data'
import { DELETE_PRODCUT , UPDATE_PRODUCT , CREATE_PRODUCT } from '../actions/Product';
import Product from '../../models/Product';

const initialState = {
    avalibleProducts: PRODUCTS,
    userProduct: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {
    switch (action.type) {

        case CREATE_PRODUCT:
            const newProduct = new Product(
              new Date().toString(),
              'u1',
              action.productData.title,
              action.productData.imageUrl,
              action.productData.description,
              action.productData.price
            );
            return {
              ...state,
              avalibleProducts: state.avalibleProducts.concat(newProduct),
              userProduct: state.userProduct.concat(newProduct)
            };
          case UPDATE_PRODUCT:
             //user product
            const productIndex = state.userProduct.findIndex(
              prod => prod.id === action.pid
            );
            const updatedProduct = new Product(
              action.pid,
              state.userProduct[productIndex].ownerId,
              action.productData.title,
              action.productData.imageUrl,
              action.productData.description,
              state.userProduct[productIndex].price
            );
            const updatedUserProducts = [...state.userProduct];
            updatedUserProducts[productIndex] = updatedProduct;

            //avalible product
            const availableProductIndex = state.avalibleProducts.findIndex(
              prod => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.avalibleProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
              ...state,
              avalibleProducts: updatedAvailableProducts,
              userProduct: updatedUserProducts
            };

        case DELETE_PRODCUT:
            return {
                ...state,
                userProduct: state.userProduct.filter(product => product.id !== action.pid),
                avalibleProducts: state.avalibleProducts.filter(product => product.id !== action.pid)

            }
    }
    return state;
};