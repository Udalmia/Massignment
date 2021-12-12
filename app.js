const express= require("express")
const users= require("./users.json")
const app=express();
app.use(express.json());
const logger=(req, res, next) => {
    req.name = "Dhaval Chedda";
    console.log(req.method);
    next();
};
app.use(logger);
app.get("/",(req, res) =>{
    
    res.send(users);
});
app.post("/",(req,res) =>{
    // console.log(req.body);
     const newUsers=[...users, req.body]
     res.send(newUsers);
     //console.log(newUsers)
 });
 app.get("/:id",(req, res) =>{
    const newUsers=[...users, req.params.id]
    res.send(newUsers);
   // console.log(req.params.id)
   // res.send(users);
});
app.patch("/:book_name" ,(req, res) =>{
    const newUsers=users.map((user) =>{
        if(req.params.book_name === user.book_name){
            return req.body;
        }
        return user;
    });
    res.send(newUsers);
   // res.send("api_requested_by:", req.name)
    console.log("api_requested_by:", req.name)

});
app.delete("/:book_name",(req, res) =>{
    const newUsers =users.filter((user) => user.book_name !== req.params.book_name);
    res.send(newUsers);
});
app.listen(2345, function(){
    console.log("listening to port 2345");
});