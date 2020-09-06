import { fork, all } from "redux-saga/effects";
import restaurantSaga from "./saga/restaurantSaga";
import authSaga from "./saga/authSaga";

export default function* () {
	yield all([fork(restaurantSaga), fork(authSaga)]);
}
