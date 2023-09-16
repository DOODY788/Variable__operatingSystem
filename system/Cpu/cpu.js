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

app.get('/thread1');
app.get('/thread2');
app.get('/thread3');
app.get('/thread4');


app.listen(app_port,()=>{
    console.log('cpu has successfully booted at core port ',app_port);
})