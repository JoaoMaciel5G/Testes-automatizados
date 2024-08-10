import express from "express"
import router from "./routes/searchJob"
import "dotenv/config"

const app = express()

app.use(express.json())
app.use("/search", router)

export default app
