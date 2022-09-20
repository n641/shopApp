import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ShopNavigator from './Navigation/shopNavigator';
import ProductOverviewScreen from './screens/shop/ProductOverviewScreen';

import { createStore , combineReducers , applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import productReducer from './store/reducers/product'
import CartReducer from './store/reducers/Cart'
import OrderReducer from './store/reducers/Orders'


const rootreducer = combineReducers({
  products:productReducer,
  cart:CartReducer,
  orders:OrderReducer
})

const store = createStore(rootreducer , applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
   <ShopNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
