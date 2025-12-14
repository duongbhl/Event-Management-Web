import express from "express"
import cors from "cors"
import morgan from "morgan"
import { errorHandler } from "./middleware/auth.middleware"
import { authRouter } from "./routes/auth.route"

export const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth",authRouter)

app.use(errorHandler)



