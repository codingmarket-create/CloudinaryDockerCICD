import { useEffect, useState } from "react";

import api from "../services/api";

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

function Home() {

  const [images, setImages] = useState([]);

  const fetchImages = async () => {

    try {

      const response = await api.get("/images");

      setImages(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>

      <Typography
        variant="h4"
        mb={4}
      >
        Image Gallery
      </Typography>

      <Grid container spacing={3}>

        {images.map((image) => (

          <Grid item xs={12} sm={6} md={4} key={image._id}>

            <Card>

              <CardMedia
                component="img"
                height="200"
                image={image.imageUrl}
                alt={image.title}
              />

              <CardContent>

                <Typography variant="h6">
                  {image.title}
                </Typography>

                <Typography variant="body2">
                  Uploaded by:
                  {" "}
                  {image.uploadedBy?.name}
                </Typography>

              </CardContent>

            </Card>

          </Grid>
        ))}

      </Grid>

    </Container>
  );
}

export default Home;