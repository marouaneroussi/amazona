import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '.././reducers/reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)


  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  
  export {
    store,
    persistor
 }
