const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');

class process {
    constructor(payload1, payload2, command, callback, addon) {
        // Yet to be developed...
        this.payload1 = payload1;
        this.payload2 = payload2;
        this.command = command;
        this.callback = callback;
        this.addon = addon;
    }

    command() {
        this.sorted_command = this.command.split(' ');
        "0 - name of process"
        "1 - argument1"
        "2 - argument2"

        return this.sorted_command;

    }

    async load(arg) {
        this.arg1 = arg;

        const dir = path.join(__dirname + './../extentions/slime.py');
        console.log(dir);
        const childProcess = spawn('python',[dir]);

        childProcess.stdout.on('data',(data)=>{
            // console.log(data.toString());
            this.insertToRam(data);
            return data.toString();
        })

        childProcess.stderr.on('data',(data)=>{
            // console.log(data.toString());
            return data.toString();
        })

    }

    insertToRam(data) {
        const file = fs.readFileSync((path.join(__dirname, './../Ram/stack1/json')));
        console.log(file);
    }
}


async function runtime(params) {
    const Process = new process();
    const file_path = path.join(__dirname + '../../../storage/C/pictures/');
    const data = await Process.load(file_path).then(y=>console.log(y));
    console.log(data);
}
runtime();