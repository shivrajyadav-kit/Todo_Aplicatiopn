import http from "http"

const app=http.createServer((req,res)=>{
   if(req.url==="/"){
    
   }

    if(req.url==="/signup")
    // console.log(req)
    console.log(res)
    res.end()
})





app.listen(3000)