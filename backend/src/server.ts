import { app } from "./app"
import { connectDB } from "./config/db"


const PORT = 5000

const test = async () =>{
    await connectDB()
    app.listen(PORT,()=>{
        // \x1b[32m = green, \x1b[0m = reset
        console.log(`\x1b[32mServer is running at http://localhost:${PORT}\x1b[0m`);
    })
}

test();