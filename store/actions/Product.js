import Product from '../../models/Product'
export const DELETE_PRODCUT = "DELETE_PRODCUT ";
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProduct = () => {

  return async dispatch => {
    //do any async code you want!!
    const responce = await fetch('https://shopapppractices-default-rtdb.firebaseio.com/product.json')

    const resData = await responce.json();
    console.log(resData);

    const loadProduct = [];
    for (const key in resData) {
      loadProduct.push(new Product(
        key, 'U1', resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price
      ))
    }
    dispatch({ type: SET_PRODUCTS, products: loadProduct })
  }
}

export const deleteItem = (productId) => {
  return async dispatch =>{

    await fetch(`https://shopapppractices-default-rtdb.firebaseio.com/product.json/${productId}`, {
      method: 'DELETE',
      
    })

    dispatch( {
       type: DELETE_PRODCUT,
        pid: productId 
      });

  }
}


export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    //do any async code you want!!
    const responce = await fetch('https://shopapppractices-default-rtdb.firebaseio.com/product.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // to transform from string to json
        title,
        description,
        imageUrl,
        price
      })
    })

    const resData = await responce.json();
    console.log(resData);


    //save data localy after save it to local server
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,//id of product in server
        title,
        description,
        imageUrl,
        price
      }
    });
  }
}


export const updateProduct = (id, title, description, imageUrl) => {

  return async dispatch => {
    //do any async code you want!!
     await fetch(
      `https://shopapppractices-default-rtdb.firebaseio.com/product/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // to transform from string to json
        title,
        description,
        imageUrl,
      })
    })

    const resData = await responce.json();
    console.log(resData);


    dispatch( {
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    });
  }
  
};
