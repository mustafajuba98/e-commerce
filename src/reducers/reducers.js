import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../actions/actions";

const getUserData = (key, username) => {
  if (!username) return [];
  const data = JSON.parse(localStorage.getItem(`${key}_${username}`));
  return data ? data : [];
};

const initialState = {
  cart: {},
  wishlist: {},
};

// Cart Reducer
export const cartReducer = (state = initialState.cart, action) => {
  const username = JSON.parse(localStorage.getItem("loginSession"))?.username;
  if (!username) return state;

  let updatedState = { ...state };

  switch (action.type) {
    case ADD_TO_CART:
      updatedState[username] = [...(state[username] || []), action.payload];
      localStorage.setItem(`cart_${username}`, JSON.stringify(updatedState[username]));
      return updatedState;

    case REMOVE_FROM_CART:
      updatedState[username] = (state[username] || []).filter(item => item.id !== action.payload);
      localStorage.setItem(`cart_${username}`, JSON.stringify(updatedState[username]));
      return updatedState;

    default:
      return { ...state, [username]: getUserData("cart", username) };
  }
};

// Wishlist Reducer
export const wishlistReducer = (state = initialState.wishlist, action) => {
  const username = JSON.parse(localStorage.getItem("loginSession"))?.username;
  if (!username) return state;

  let updatedState = { ...state };

  switch (action.type) {
    case ADD_TO_WISHLIST:
      updatedState[username] = [...(state[username] || []), action.payload];
      localStorage.setItem(`wishlist_${username}`, JSON.stringify(updatedState[username]));
      return updatedState;

    case REMOVE_FROM_WISHLIST:
      updatedState[username] = (state[username] || []).filter(item => item.id !== action.payload);
      localStorage.setItem(`wishlist_${username}`, JSON.stringify(updatedState[username]));
      return updatedState;

    default:
      return { ...state, [username]: getUserData("wishlist", username) };
  }
};
