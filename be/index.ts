import express from 'express';
import * as parser from 'body-parser';
import cors from 'cors';


const app =  express();
const port = 8888;

app.use(cors())
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.listen(port, function(){
    console.log("App started...")
    console.log("Listening on port " + port)
});
