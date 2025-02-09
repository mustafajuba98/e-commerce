import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../actions/actions";

const initialState = {
  cart: [],
  wishlist: [],
};

export const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export const wishlistReducer = (state = initialState.wishlist, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return [...state, action.payload];
    case REMOVE_FROM_WISHLIST:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};
