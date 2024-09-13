import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import "animate.css";

import todoActioncreater, {
  addTodo,
  clearTodo,
  deleteTodo,
  updateTodo,
} from "../../redux/action";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: 20, // Default font size for the body (in pixels)
    h1: {
      fontSize: "1.2rem", // Specific font size for <h1>
    },
    h2: {
      fontSize: "2rem", // Specific font size for <h2>
    },
    // Add other variants if needed
  },
});

const Todoapp = () => {
  const { todoList, loading, error } = useSelector((state) => state);

  const [inputText, setInputText] = useState("");
  const [toggle, settoggle] = useState(false);
  const [checkId, setCheckId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoActioncreater());
  }, [dispatch]);

  const handleinputfield = (e) => {
    let { value } = e.target;
    setInputText(value);
  };
  const handleAddTodo = (newTodo) => {
    if (inputText == "" || inputText == false) {
      return toast.error("Please Enter text to add todo...");
    }

    setInputText("");
    dispatch(addTodo(newTodo));
    toast.success("Todo added successfully");
  };

  const handleClearTodo = () => {
    dispatch(clearTodo());
    toast.success("Cleared all Todos...");
  };

  const handleDeleteTodo = (todoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(todoId));

        Swal.fire({
          title: "Deleted!",
          text: "Your Todo has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handletodoupdate = (data, todoId) => {
    setInputText(data);
    settoggle(true);
    setCheckId(todoId);
  };

  const handleupdateExistingTodo = () => {
    settoggle(false);
    dispatch(updateTodo(inputText, checkId));
    setInputText("");
    toast.success("Todo Updated successully ");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          sx={{
            padding: "5px",
            height: "12vh",
            // border: "2px solid green",
            display: "flex",
            justifyContent: "flex-end",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-around",
              // border: "2px solid red",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontFamily: "Poppins",
                fontSize: "25px",
                fontFamily: "cursive",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: "#222",
              }}
            >
              Todo App
            </Typography>

            <TextField
              id="outlined-basic"
              label="Enter todo"
              variant="outlined"
              sx={{ width: "50%" }}
              value={inputText}
              onChange={handleinputfield}
              autoComplete="off"
            />

            <Box
              sx={{
                display: "flex",
                gap: "4px",
              }}
            >
              {!toggle ? (
                <>
                  <Button
                    variant="contained"
                    onClick={() => handleAddTodo(inputText)}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    add Todo
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    onClick={handleupdateExistingTodo}
                  >
                    update Todo
                  </Button>
                </>
              )}

              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                }}
                onClick={handleClearTodo}
              >
                Clear Todo
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {error && <Typography>Error: {error}</Typography>}

        <Container sx={{ marginTop: "120px" }}>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ display: "inline" }}>
                Please wait Fetching the details
              </Typography>
              <SyncLoader color="#13bb31" margin={3} size={20} />
            </Box>
          )}
          {!loading && !error && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              {todoList.length > 0 ? (
                todoList.map((todo) => (
                  <Box
                    key={todo.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px",
                      borderRadius: "6px",
                      alignContent: "center",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "80%",
                      }}
                    >
                      {todo.todo}
                    </Typography>
                    <Box>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ marginRight: "8px", textTransform: "none" }}
                        onClick={() => handletodoupdate(todo.todo, todo.id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteTodo(todo.id)}
                        sx={{
                          textTransform: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No todos available</Typography>
              )}
            </Box>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Todoapp;
