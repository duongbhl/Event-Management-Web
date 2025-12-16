import express from "express"
import cors from "cors"
import morgan from "morgan"
import { errorHandler } from "./middleware/auth.middleware"
import { authRouter } from "./routes/auth.route"
import { userRouter } from "./routes/user.route"
import { adminRouter } from "./routes/admin.route"

export const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)

app.use(errorHandler)



