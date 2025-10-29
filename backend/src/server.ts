import { app } from "./app"
import { connectDB } from "./config/db"


const PORT = 5000

const test = async () =>{
    await connectDB()
    app.listen(PORT,()=>{
        console.log(`✅SERVER BẮT ĐẦU CHẠY TRÊN CỔNG http://localhost:${PORT}`);
    })
}

test();