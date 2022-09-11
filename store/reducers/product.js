import PRODUCTS from '../../data/dummuy-data'
const initialState ={
    avalibleProducts:PRODUCTS,
    userProduct:PRODUCTS.filter(prod => prod.ownerId ==='u1')
}

export default (state = initialState,action)=>{
return state;
};