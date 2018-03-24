import { combineReducers } from "redux";
/*import auth from "./auth";
import userData from "./userData";
import adminData from "./adminData";*/
import userData from "./userData";
import auth from "./auth";
import ui from "./ui";

const rootReducer = combineReducers({
  auth,
  userData,
  ui
});

export default rootReducer;
