import CodeBox from "@/components/app/editor/Codebox";
import Explorer from "@/components/app/editor/explorer/Index";
import OpenFiles from "@/components/app/editor/OpenFiles";
import NavBar from "@/components/app/NavBar/Index";
import { Box } from "@mui/material";
import React from "react";

function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row"}}>
      <NavBar/>
      <div>
        <Explorer />
      </div>
      <Box sx={{flexGrow:"1"}}>
        <OpenFiles />
        <CodeBox />
      </Box>
    </Box>
  );
}

export default Home;