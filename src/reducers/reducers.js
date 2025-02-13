import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../actions/actions";

const getUserData = (key, username) => {
  const storageKey = `${key}_${username || "guest"}`;
  const data = JSON.parse(localStorage.getItem(storageKey));
  return data ? data : [];
};

const initialState = {
  cart: {},
  wishlist: {},
};

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

    case "CLEAR_CART":
      updatedState[action.payload] = [];
      localStorage.setItem(`cart_${action.payload}`, JSON.stringify([]));
      return updatedState;

    default:
      return state[username] ? state : { ...state, [username]: getUserData("cart", username) };
  }
};

export const wishlistReducer = (state = initialState.wishlist, action) => {
  const username = JSON.parse(localStorage.getItem("loginSession"))?.username || "guest";
  let updatedState = { ...state };

  switch (action.type) {
    case ADD_TO_WISHLIST:
      const updatedWishlist = [...(state[username] || []), action.payload];

      updatedState[username] = updatedWishlist;
      localStorage.setItem(`wishlist_${username}`, JSON.stringify(updatedWishlist));

      return { ...updatedState }; 

    case REMOVE_FROM_WISHLIST:
      updatedState[username] = (state[username] || []).filter(item => item.id !== action.payload.id);
      localStorage.setItem(`wishlist_${username}`, JSON.stringify(updatedState[username]));
      return { ...updatedState };

    case "CLEAR_WISHLIST":
      updatedState[username] = [];
      localStorage.setItem(`wishlist_${username}`, JSON.stringify([]));
      return { ...updatedState };

    case "LOAD_WISHLIST":
      return { ...state, [username]: action.payload.items };

    default:
      return state[username]
        ? state
        : { ...state, [username]: getUserData("wishlist", username) };
  }
};
