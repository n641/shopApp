export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch=>{
    const date=new Date();
    const responce = await fetch('https://shopapppractices-default-rtdb.firebaseio.com/orders/u1.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // to transform from string to json
        cartItems,
        totalAmount,
        date:date.toISOString()
      })
    })

    const resData = await responce.json();
    console.log(resData);

    dispatch({
      type: ADD_ORDER,
      orderData: { id:resData.name,items: cartItems, amount: totalAmount , date:date }
    });
  }
  
};
