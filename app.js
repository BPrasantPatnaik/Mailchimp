const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const F_name= req.body.f_name;
    const L_name=req.body.l_name;
    const email=req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: F_name,
                    LNAME: L_name,
                }
            }
        ]
    };
    const JsonData=JSON.stringify((data));//it makes the data into a string type which would be easier to send

    const url="";
    const options={
        method: "POST",
        auth: ""

    }
    //https.get is used to get the data from the third party api.
    //https.request is use dto request regarding any data from the thord party api

    const request=https.request(url,options,function(response){

        response.on("data",function(data){

            console.log(JSON.parse(data));

        })
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        
    })

    request.write(JsonData);
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(3000,function(){
    console.log("Your server is running in port 3000");
})

