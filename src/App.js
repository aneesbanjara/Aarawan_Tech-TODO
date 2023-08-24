import { Field } from "formik";
import { useEffect, useState } from "react";
import {
  AiOutlineCheckSquare,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMenu,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { allActions } from "./Redux/myActions";
import { v4 as uuidv4 } from "uuid";

function App() {
  const store = useSelector((state) => {
    return {
      todoState: state.TodoReducer,
    };
  });
  const [todoData, setTodoData] = useState({
    todo: null,
  });
  const actions = useDispatch();
  const fetchTodos = () => {
    actions(
      allActions(
        {},
        {
          method: "get",
          endPoint: `/todos`,
          attempt: "FETCH_ALL_TODOS_REQUEST",
          success: "FETCH_ALL_TODOS_REQUEST_SUCCESS",
          failure: "FETCH_ALL_TODOS_REQUEST_FAILURE",
          successInternalState: () => {},
        }
      )
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = (e) => {
    actions(
      allActions(
        { id: uuidv4(), todo: todoData.todo, isCompleted: false },
        {
          method: "post",
          endPoint: `/todos`,
          attempt: "ADD_TODO_REQUEST",
          success: "ADD_TODO_REQUEST_SUCCESS",
          failure: "ADD_TODO_REQUEST_FAILURE",
          navigateTo: null,
          successInternalState: (data) => {
            fetchTodos();
          },
        }
      )
    );
  };
  return (
    <>
      <header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "3rem",
            backgroundColor: "white",
            padding: "0 1.5rem",
          }}
        >
          <AiOutlineMenu size="20px" />
        </div>
      </header>
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            backgroundColor: "white",
            width: "70vw",
            height: "80vh",
            marginTop: "2rem",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <input
              placeholder="What do you have planned?"
              onChange={(e) => {
                setTodoData((prevData) => {
                  return {
                    ...prevData,
                    todo: e.target.value,
                  };
                });
              }}
            />
            <button onClick={handleAddTodo}>Add Todo</button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0 1rem",
            }}
          >
            {store.todoState?.todos?.map((dataObj, index) => {
              return (
                <div
                  key={dataObj.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    border: "1px solid #999",
                    padding: "0.7rem",
                    borderRadius: "25px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <span>{dataObj.todo}</span>
                    <span style={{ fontSize: "14px" }}>
                      {dataObj.isCompleted ? "COMPLETED" : "ACTIVE"}
                    </span>
                  </div>
                  <input
                    onChange={(e) => {
                      setTodoData((prevData) => {
                        return {
                          ...prevData,
                          todo: e.target.value,
                        };
                      });
                    }}
                  />
                  <div style={{ display: "flex", gap: "0.3rem" }}>
                    <a>
                      <div
                        className="bordered"
                        onClick={() => {
                          actions(
                            allActions(
                              { todo: todoData.todo },
                              {
                                method: "put",
                                endPoint: `/todos/${dataObj.id}`,
                                attempt: "UPDATE_TODO_REQUEST",
                                success: "UPDATE_TODO_REQUEST_SUCCESS",
                                failure: "UPDATE_TODO_REQUEST_FAILURE",
                                successInternalState: () => {
                                  fetchTodos();
                                },
                              }
                            )
                          );
                        }}
                      >
                        <AiOutlineEdit />
                      </div>
                    </a>

                    <a>
                      <div
                        className="bordered"
                        onClick={() => {
                          actions(
                            allActions(
                              { isCompleted: !dataObj.isCompleted },
                              {
                                method: "patch",
                                endPoint: `/todos/${dataObj.id}`,
                                attempt: "TOGGLE_TODO_STATUS_REQUEST",
                                success: "TOGGLE_TODO_STATUS_REQUEST_SUCCESS",
                                failure: "TOGGLE_TODO_STATUS_REQUEST_FAILURE",
                                successInternalState: () => {
                                  fetchTodos();
                                },
                              }
                            )
                          );
                        }}
                      >
                        <AiOutlineCheckSquare />
                      </div>
                    </a>
                    <a style={{ color: "red" }}>
                      <div className="bordered">
                        <AiOutlineDelete
                          onClick={() => {
                            actions(
                              allActions(
                                {},
                                {
                                  method: "delete",
                                  endPoint: `/todos/${dataObj.id}`,
                                  attempt: "DELETE_TODO_REQUEST",
                                  success: "DELETE_TODO_REQUEST_SUCCESS",
                                  failure: "DELETE_TODO_REQUEST_FAILURE",
                                  successInternalState: () => {
                                    fetchTodos();
                                  },
                                }
                              )
                            );
                          }}
                        />
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
