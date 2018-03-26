import { combineReducers } from "redux";
import selectedUser from "./selectedUser";
import userData from "./userData";
import auth from "./auth";
import ui from "./ui";

const rootReducer = combineReducers({
  selectedUser,
  auth,
  userData,
  ui
});

export default rootReducer;
