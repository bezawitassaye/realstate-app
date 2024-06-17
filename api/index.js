import express from "express";

const app = express();

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
