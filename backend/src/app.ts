import express from "express"
import cors from "cors"
import morgan from "morgan"
import { errorHandler } from "./middleware/auth.middleware"
import { authRouter } from "./routes/auth.route"
import { userRouter } from "./routes/user.route"
import { adminRouter } from "./routes/admin.route"

export const app = express()

// CORS configuration to support HTTPS frontend
const corsOptions = {
  origin: [
    'https://nhihoangf.id.vn',
    'http://nhihoangf.id.vn',
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)

app.use(errorHandler)



