import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import "animate.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import PlaylistAddTwoToneIcon from '@mui/icons-material/PlaylistAddTwoTone';
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
  Checkbox,
} from "@mui/material";
import toast from "react-hot-toast";
import { Scale, Update } from "@mui/icons-material";

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
  const [isChecked, setIsChecked] = useState(false); // State for managing checkbox

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

  // const handleCheckbox = (e) => {
  //   setCheckId(e.target.value);
  //   console.log(e.target.value);
  // };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography
          sx={{
            textAlign: "center",
            width: "100vw",
            fontSize: {
              xs: "30px",
              md: "40px",
            },
            fontFamily: "Poppins, Arial, sans-serif",
            position: "fixed",
            top: "0px",
            right: "0px",
            zIndex: "5",
            backgroundColor: "#fff",
          }}
        >
          Todo List
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr " }, // Adjust grid for responsive design
            position: "fixed",
            top: {
              xs: "40px",
              md: "50px",
            },
            right: "0px",
            zIndex: "5",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px", // Add gap between elements
            paddingY: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            width: "100vw",
            // backgroundColor:"white"
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter todo"
            variant="outlined"
            sx={{
              width: {
                xs: "100%",
                sm: "75%",
                md: "50%",
              },
              paddingX: {
                xs: "10px",
              },
              marginTop: { xs: "10px" },
              margin: "auto",
              paddingX: "6px",
            }}
            value={inputText}
            onChange={handleinputfield}
            autoComplete="off"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingX: "4px",
              gap: "16px",
            }}
          >
            {!toggle ? (
              <Button
                variant="contained"
                onClick={() => handleAddTodo(inputText)}
                sx={{
                  textTransform: "none",
                  width: { xs: "160px", sm: "140px", md: "180px" },
                  height: "40px",
                  fontSize: { xs: "14px", sm: "14px", md: "16px" },
                }}
              >
                Add Todo <PlaylistAddTwoToneIcon/>
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleupdateExistingTodo}
                sx={{
                  textTransform: "none",
                  width: { xs: "130px", md: "180px" },
                  height: "40px",
                  fontSize: { xs: "14px", sm: "14px", md: "16px" },
                }}
              >
                Update Todo  <CheckTwoToneIcon/>
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleClearTodo}
              sx={{
                textTransform: "none",
                width: { xs: "120px", sm: "110px", md: "120px" },
                height: "40px",
                fontSize: { xs: "14px", sm: "14px", md: "16px" },
              }}
            >
              Clear Todo
            </Button>
          </Box>
        </Box>
      </ThemeProvider>

      {error && (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: "20px",
              sm: "25px",
              lg: "30px",
            },
            marginTop: "250px",
          }}
        >
          Error: {error}
        </Typography>
      )}

      {loading && (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: "20px",
              sm: "25px",
              lg: "30px",
            },
            marginTop: "250px",
          }}
        >
          Please wait Fetching the details{" "}
          <SyncLoader color="#13bb31" margin={3} size={20} />
        </Typography>
      )}

      {!loading && !error && (
        <Box
          sx={{
            display: "grid",
            gap: "30px",
            // border: "2px solid blue",
            marginTop: "220px",
            padding: "5px",
          }}
        >
          <Box
            sx={{
              // border: "2px solid black",
              display: "flex",
             
              flexDirection:"column-reverse",
              gap: "20px",
              width: {
                sm: "95%",
                md: "70%",
              },
              // translate:Scale,
              margin: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(12px)",
            }}
          >
            {todoList.length > 0 ? (
              todoList.map((todo) => {
                return (
                  <React.Fragment key={todo.id}>
                    <Box
                      sx={{
                        borderRadius: "12px",
                        padding: "8px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        transition: "all 0.4s ease-in-out ", 
                        ":hover": {
                          transform: "scale(1.02)",
                        },
                        cursor:"pointer"
                      }}
                    >
                      {/* <Checkbox
                        sx={{
                          display: "inline",
                        }}
                        onClick={handleCheckbox}
                      /> */}
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "20px",
                          },
                          display: "inline",
                          width: "75%",
                        }}
                      >
                        {todo.todo}
                      </Typography>

                      <Box
                        sx={{
                          // border:"2px solid red",
                          paddingLeft: "8px",
                          marginTop: "40px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          sx={{
                            marginRight: "8px",
                            textTransform: "none",
                            width: {
                              xs: "30%",
                              md: "20%",
                              sm: "25%",
                              lg: "15%",
                            },
                          }}
                          onClick={() => handletodoupdate(todo.todo, todo.id)}
                        >
                          Update <EditIcon/>
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteTodo(todo.id)}
                          sx={{
                            width: {
                              xs: "30%",
                              md: "20%",
                              sm: "25%",
                              lg: "15%",
                            },
                            textTransform: "none",
                          }}
                        >
                          Delete
                          <DeleteIcon/>
                        </Button>
                      </Box>
                    </Box>
                  </React.Fragment>
                );
              })
            ) : (
              <Typography>No todos available</Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Todoapp;
