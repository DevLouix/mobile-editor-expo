import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useExplorerContext } from "@/contexts/ExplorerContext";
import { FileItem } from "@/types/main";

export default function File() {
  const { setFiles } = useExplorerContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openFolderAndGetStructure = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/*', // Change as needed
        multiple: false,
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const folderPath = result.uri; // Get the folder's URI
        const folderStructure = await loadDirectoryStructure(folderPath);

        console.log(JSON.stringify(folderStructure, null, 2));
        setFiles(folderStructure);
      }
    } catch (error) {
      console.error("Failed to open directory:", (error as Error).message);
    }
  };

  const loadDirectoryStructure = async (folderPath: string): Promise<FileItem[]> => {
    const files: FileItem[] = [];
    
    // Read the directory contents
    try {
      const directoryContents = await FileSystem.readDirectoryAsync(folderPath);
      for (const fileName of directoryContents) {
        const filePath = `${folderPath}/${fileName}`;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        
        const fileItem: FileItem = {
          name: fileName,
          isDirectory: fileInfo.isDirectory,
          path: filePath,
        };

        files.push(fileItem);
      }
    } catch (error) {
      console.error("Error reading directory structure:", error);
    }

    return files;
  };

  return (
    <div>
      <Typography
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onMouseEnter={handleClick}
      >
        File
      </Typography>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Open File</MenuItem>
        <MenuItem onClick={openFolderAndGetStructure}>Open Folder</MenuItem>
        <MenuItem onClick={handleClose}>Save</MenuItem>
      </Menu>
    </div>
  );
}
