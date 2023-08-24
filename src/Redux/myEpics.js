import { ofType } from "redux-observable";
import { catchError, mergeMap } from "rxjs/operators";
import { from, of } from "rxjs";
import { Api } from "../Helpers/BaseUrlProvider";

export const AllEpic = (action$) =>
  action$.pipe(
    ofType(
      "FETCH_ALL_TODOS_REQUEST",
      "ADD_TODO_REQUEST",
      "UPDATE_TODO_REQUEST",
      "DELETE_TODO_REQUEST",
      "TOGGLE_TODO_STATUS_REQUEST"
    ),
    mergeMap((action) =>
      from(Api(action)).pipe(
        mergeMap((response) => {
          if (action.type_data.successInternalState) {
            action.type_data.successInternalState(response.data);
          }
          return of({
            type: action.type_data.success,
            payload: response.data,
          });
        }),
        catchError((err) => {
          console.warn(err);
          if (action.type_data.failureInternalState) {
            action.type_data.failureInternalState(err?.response?.data);
          }
          return of({ type: action.type_data.failure, payload: err.response });
        })
      )
    )
  );
