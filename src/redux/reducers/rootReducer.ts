import { combineReducers } from "redux";
import toast from "./toast/index";
import loader from "./loader/index";
import tokenReducer from "./token/index";

const rootReducer = combineReducers({
  // customizer,
  // auth,
  // navbar,
  toast,
  loader,
  tokenReducer,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
