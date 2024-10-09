import { Box, Typography } from "@mui/material";
import React from "react";
import { flexRowBetween } from "@/styles/main";
import FileBrowser from "./FileBrowser";
import ToolBar from "./Toolbar";

function Explorer() {
  return (
    <Box
      sx={{
        minWidth: "20vw",
        height: "100vh",
        backgroundColor: "black",
        color: "grey",
        overflowY: "auto",
      }}
    >
      <Box>
        <Box sx={flexRowBetween}>
          <Typography variant="h6" fontWeight={"bold"}>
            Explorer
          </Typography>
          <ToolBar/>
        </Box>
        <FileBrowser />
      </Box>
    </Box>
  );
}

export default Explorer;