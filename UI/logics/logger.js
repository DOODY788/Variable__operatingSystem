'use strict';

class logger {
    constructor() {
        this.desktop = document.querySelector('.Desktop');
        this.statefunction = null;
        this.internalText = null;
        this.stateFunctions();
    }
    stateFunctions() {
        this.property_index = [
            ['class', '_dom'],
            ['class', '_bkdisplay'],
            ['class', '_widdom'],
            ['class', '_useravatardom'],
            ['class', '_username'],
            ['class', '_feedbackdom'],
            ['class', '_passent'],
            ['class', '_proceedbutton'],
        ]
        let iteratable = 0;
        this.eventHandlers = [
            ['Proceedbutton', this.verifyPass, 'click']
        ]
        this.statefunction = {
            "Dom": document.createElement('section'),
            "Backdisplay": document.createElement('div'),
            "Widdom": document.createElement('section'),
            "Useravatar": document.createElement('div'),
            "Username": document.createElement('div'),
            "Feedbackdom": document.createElement('section'),
            "Passent": document.createElement('input'),
            "Proceedbutton": document.createElement('input'),
        }
        for (const [key, value] of Object.entries(this.statefunction)) {
            let property = this.property_index[iteratable];
            try {
                console.log(property)
                let elem = value;
                elem.setAttribute(property[0], property[1]);
                if (key != 'Dom') {
                    this.statefunction.Dom.appendChild(elem);
                    if (key != 'Widdom' || key != 'Backdisplay') {
                        if (key != 'Backdisplay' && key != "Widdom") {
                            this.statefunction.Widdom.appendChild(elem);
                        }
                    }
                }
                console.log(elem)
                iteratable += 1;
            } catch (err) {
                console.log(err);
            } finally {
                console.log('executed');
            }
        }
        iteratable = 0;

        this.statefunction.Passent.type = 'password';
        this.statefunction.Passent.placeholder = 'Enter the password';
        this.statefunction.Passent.classList.add('definput');
        this.statefunction.Proceedbutton.type = 'button';
        this.statefunction.Proceedbutton.value = 'Login';
        this.statefunction.Proceedbutton.classList.add('def-primary-bt');
        this.statefunction.Proceedbutton.classList.add('defbutton');
        this.statefunction.Username.innerHTML = 'Welcome, Admin';
        this.statefunction.Username.classList.add('swipein');
        this.statefunction.Useravatar.classList.add('swipein');
        this.statefunction.Passent.classList.add('swipein');
        this.statefunction.Proceedbutton.classList.add('swipein');

        this.internalAvatar = document.createElement('span');
        this.internalText = document.createElement('div');
        this.internalGlass = document.createElement('div');

        this.internalAvatar.setAttribute('class', '_internaluseravatar');
        this.internalAvatar.classList.add('material-symbols-rounded');
        this.internalAvatar.innerHTML = 'person';
        this.internalText.setAttribute('class', '_feedbacktext');
        this.internalGlass.setAttribute('class', 'internalGlass');

        this.statefunction.Useravatar.appendChild(this.internalAvatar);
        this.statefunction.Feedbackdom.appendChild(this.internalText);
        this.statefunction.Widdom.appendChild(this.internalGlass);

        this.desktop.appendChild(this.statefunction.Dom);

        for (let i = 0; i < this.eventHandlers.length; i++) {
            let handler = this.eventHandlers[i];
            let elem = this.statefunction[handler[0]];
            if (handler[2] == 'click') {
                elem.onclick = () => {
                    handler[1]();
                }
            }
        }
    }
    verifyPass() {
        let elem = document.querySelector('._passent').value;
        if (elem == 'thisisadmin') {
            alert('you are logged in!');
            document.querySelector('._widdom').classList.add('sink');
            document.querySelector('._bkdisplay').classList.add('fadeout');
            document.querySelector('._dom').remove();
            window.open('../armature/variable.html','_parent')
        } else {
            document.querySelector('._feedbacktext').innerHTML = "Access denied";
            document.querySelector('._feedbacktext').classList.add('swipein');
        }
    }
}

const Logger = new logger();
