import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import reducer from 'reduce';
import { composeWithDevTools } from 'redux-devtools-extension';


const middleWare = [thunk];
export default createStore(reducer,composeWithDevTools(
    applyMiddleware(...middleWare)
));
