import { pipeline } from "@xenova/transformers";
import express from "express";
import cors from "cors";

let pipe = await pipeline('sentiment-analysis');
const app = express();
const port = 8080;

app.use(cors({
  origin: 'http://localhost:3000'
}))

// Add middleware to parse JSON requests
app.use(express.json());


app.post('/', async function (req, res) {
  const result = await pipe(req.body.message);
  res.json(result);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
}); 