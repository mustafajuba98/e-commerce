import { combineReducers } from "redux";
import { cartReducer, wishlistReducer } from "./reducers";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
