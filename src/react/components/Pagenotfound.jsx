import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <Box sx={{display:"inline" , fontSize:"50px"}}>
        404 <Typography sx={{display:"inline" , fontSize:"30px"}}>Page not found</Typography>
      </Box>
      <Link to={"/"}>
        <Button variant="contained">back to home</Button>
      </Link>
    </Container>
  );
};

export default PageNotFound;
