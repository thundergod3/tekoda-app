import { combineReducers } from "redux";
import restaurantReducer from "./redux/reducers/restaurantReducer";
import authReducer from "./redux/reducers/authReducer";
import utilReducer from "./redux/reducers/utilReducer";
import errorReducer from "./redux/reducers/errorReducer";

const rootReducer = combineReducers({
	restaurantReducer,
	authReducer,
	utilReducer,
	errorReducer,
});

export default rootReducer;
