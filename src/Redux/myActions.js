export const allActions = (
  payload = {},
  type = {
    method: "post",
    endPoint: "tasks/active",
    attempt: "FETCH_ACTIVE_TASKS_REQUEST",
    success: "FETCH_ACTIVE_TASKS_REQUEST_SUCCESS",
    failure: "FETCH_ACTIVE_TASKS_REQUEST_FAILURE",
    navigateTo: "ABC",

    saveBearerToken: false,
    successInternalState: () => console.log("my active tasks success"),
    failureInternalState: () => console.log("my active tasks failure"),
  }
) => ({ type: type.attempt, type_data: type, payload });
