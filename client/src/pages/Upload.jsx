import { useState } from "react";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import api from "../services/api";

import { toast } from "react-toastify";

function Upload() {

  const [title, setTitle] = useState("");

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", title);

      formData.append("image", image);

      await api.post(
        "/images/upload",
        formData
      );

      toast.success("Image uploaded");

      setTitle("");
      setImage(null);

    } catch (error) {

      toast.error(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">

      <Box
        mt={10}
        component="form"
        onSubmit={handleSubmit}
      >

        <Typography
          variant="h4"
          mb={3}
        >
          Upload Image
        </Typography>

        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Upload
        </Button>

      </Box>

    </Container>
  );
}

export default Upload;