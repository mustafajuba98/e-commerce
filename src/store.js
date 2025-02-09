import { createStore } from "redux";
import rootReducer from "./reducers/CombinedReducer";

const store = createStore(rootReducer);

export default store;
