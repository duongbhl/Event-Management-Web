import { app } from "./app"


const PORT = 5000

const test = async () =>{
    app.listen(PORT,()=>{
        console.log(`✅SERVER BẮT ĐẦU CHẠY TRÊN CỔNG http://localhost:${PORT}`);
    })
}

test();