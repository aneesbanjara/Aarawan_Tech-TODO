import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INIT_STATE = {
  isLoading: false,
  todos: [],
};

const TodoReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_ALL_TODOS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_ALL_TODOS_REQUEST_SUCCESS": {
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
      };
    }
    case "FETCH_ALL_TODOS_REQUEST_FAILURE": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_TODO_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "ADD_TODO_REQUEST_SUCCESS": {
      action.payload.message
        ? toast.success(action.payload.message)
        : toast.success("Success! Todo added.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "ADD_TODO_REQUEST_FAILURE": {
      action.payload.message
        ? toast.error(action.payload.message)
        : toast.error("Error! Unable to add Todo.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_TODO_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "UPDATE_TODO_REQUEST_SUCCESS": {
      action.payload.message
        ? toast.success(action.payload.message)
        : toast.success("Success! Todo updated.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "UPDATE_TODO_REQUEST_FAILURE": {
      action.payload.message
        ? toast.error(action.payload.message)
        : toast.error("Error! Unable to update Todo.");
      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_TODO_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "DELETE_TODO_REQUEST_SUCCESS": {
      action.payload.message
        ? toast.success(action.payload.message)
        : toast.success("Success! Todo deleted.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "DELETE_TODO_REQUEST_FAILURE": {
      action.payload.message
        ? toast.error(action.payload.message)
        : toast.error("Error! Unable to delete Todo.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_TODO_STATUS_REQUEST": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "TOGGLE_TODO_STATUS_REQUEST_SUCCESS": {
      action.payload.message
        ? toast.success(action.payload.message)
        : toast.success("Success! Todo status changed.");

      return {
        ...state,
        isLoading: false,
      };
    }
    case "TOGGLE_TODO_STATUS_REQUEST_FAILURE": {
      action.payload.message
        ? toast.error(action.payload.message)
        : toast.error("Error! Unable to change Todo status.");

      toast.error("error");
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default TodoReducer;
