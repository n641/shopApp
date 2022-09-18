export const DELETE_PRODCUT ="DELETE_PRODCUT ";
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteItem =(productId)=>{
 return {type : DELETE_PRODCUT , pid : productId};
}


export const createProduct = (title, description, imageUrl, price) => {
    return {
      type: CREATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price
      }
    };
  };
  
  export const updateProduct = (id, title, description, imageUrl) => {
    return {
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    };
  };
  