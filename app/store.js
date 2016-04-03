import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// App Reducers
import reducer from './reducers/reducer';

// Combine Reducers
var reducers = combineReducers({
    reducer: reducer
    // more if you want...
});

// Create Store
var store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;