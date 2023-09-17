const express = require('express');
const path = require('path');
const fs = require('fs');
const app_port = 7000;
const session_id = 0;
const sessionData = {
    'request':'/',
    'params':'',
    'processingRequired':Boolean,
    'errors':{},
    'response':null,
    'status':'',
    'time':null
}
const app = express();


app.get('/',(req,res)=>{
    res.json({'greet':'Hello user, the cpu is already awake!'});
    const file = fs.readFileSync('logs.json');
    const obj = JSON.parse(file);
    const sessionName = ('session' + session_id);
    session_id += 1;

    sessionData.params = 'none',
    sessionData.errors = 'none',
    sessionData.request = 'none',
    sessionData.processingRequired = false,
    sessionData.status = 'success',
    sessionData.time = req.params.time

    const session = {
        sessionName: sessionData
    };
})

app.get('/loadDocument',(req,res)=>{
    res.json({'getting':'data'});
})

app.get('/thread1',(req,res)=>{
    const runtime = new process(req.params.payload1,req.params.payload2,req.params.commands,req.params.addons);
});
app.get('/thread2',(req,res)=>{
    const runtime = new process(req.params.payload1,req.params.payload2,req.params.commands,req.params.addons);
});
app.get('/thread3',(req,res)=>{
    const runtime = new process(req.params.payload1,req.params.payload2,req.params.commands,req.params.addons);
});
app.get('/thread4',(req,res)=>{
    const runtime = new process(req.params.payload1,req.params.payload2,req.params.commands,req.params.addons);
});


app.listen(app_port,()=>{
    console.log('cpu has successfully booted at core port ',app_port);
})