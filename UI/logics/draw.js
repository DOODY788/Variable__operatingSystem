'use strict';

export default class drawWindow {
    constructor(specs = {
        'type': type,
        'width': width,
        'height': height,
        'frameStyle': frameStyle,
        'initialX': initialX,
        'initialY': initialY,
        'isToolwindow': isToolwindow,
        'title': title,
        'icon': icon,
        'windowShadow': Boolean,
        'internalFile': internalFile,
    }) {
        this.config = specs;
        this.frame_styles = [
            'shyama', 'maya', 'nisha'
        ]

        this.window_mode = 'locomotion';
        
        document.querySelector('#desk_frame').appendChild(this.createBody(this.config));
        this.window_body.style.left = `${this.config.initialX}px`;
        this.window_body.style.top = `${this.config.initialY}px`;
        this.window_state = {
            'current_state':{
                'width':null,
                'height':null,
                'canvas_height':null,
                'canvas_width':null,
                'canvas_document':null,
                'head_width':null,
                'head_height':null,
                'window_title':this.config.title,
                'window_icon':this.config.icon,
                'window_position_x':this.window_body.offsetLeft,
                'window_position_y':this.window_body.offsetTop,
                'window_mode':null,
                'window_arm':this.config,
            },
            'step_backward':null,
            'step_forward':null
        }
        const i = 50;
        setTimeout(() => {
            this.window_body.style.display = 'flex';
            this.window_body.classList.add('win_loading_animation');
            this.window_body.style.width = (this.config.width);
            this.window_body.style.height = this.config.height;
        }, 100);
        setTimeout(() => {
            this.window_body.classList.remove('win_loading_animation');
        }, 350); 
    }
    generateId(prefix) {
        return `${prefix + Math.floor(Math.random() * 1000)}`;
    }

    createBody(specs) {
        this.window_body = document.createElement('section');
        // this.window_body.style.width = specs.width;
        // this.window_body.style.height = specs.height;
        this.window_body.style.width = 0;
        this.window_body.style.height = 0;
        this.window_body.id = this.generateId(specs.type);
        this.window_body.classList.add(specs.type);
        this.window_body.setAttribute('data-state', 'normal');
        this.window_body.setAttribute('data-mode', 'locomotion');
        this.window_body.setAttribute('data-state', 'max');
        this.window_body.setAttribute('data-isMin', false);

        this.window_head = this.createHead(specs.title, specs.frameStyle, specs.isToolwindow, specs.icon);
        this.window_canvas = this.createCanvas();

        this.window_body.appendChild(this.window_head);
        this.window_body.appendChild(this.window_canvas);
        this.windowEvents(false, this.window_body, this.window_head);
        return this.window_body;
    }

    createHead(title, frameStyle, isToolwindow, icon) {
        this.head = document.createElement('div');
        this.head.id = this.generateId('head');
        this.head.classList.add('window_head')
        this.icon = document.createElement('div');
        this.icon_image = document.createElement('img');
        this.title = document.createElement('div');
        this.icon.classList.add('icon');
        this.icon_image.src = icon;
        this.icon.appendChild(this.icon_image);
        this.title.innerHTML = title;
        this.title.classList.add('title');

        try {
            this.head.classList.add(this.frame_styles[frameStyle]);
        } catch (er) {
            alert(er);
        }
        if (!isToolwindow) {
            this.traffic_light = this.createTrafficlights()
            this.head.appendChild(this.icon);
            this.head.appendChild(this.title);
            this.head.appendChild(this.traffic_light);
            return this.head;
        }
        else {
            this.head.appendChild(this.icon);
            this.head.appendChild(this.title);
            return this.head;
        }


    }

    createCanvas(){
        this.canDOm = document.createElement('div');
        this.canDOm.setAttribute('class','canDom');
        this.canDOm.id = this.generateId('canvas');
        this.innerCode = document.createElement('iframe');
        this.innerCode.src= this.config.internalFile;
        this.innerCode.setAttribute('class','innerCode');
        this.canDOm.appendChild(this.innerCode);
        return this.canDOm;
    }

    createTrafficlights() {
        this.close = document.createElement('div');
        this.minimize = document.createElement('div');
        this.maximize = document.createElement('div');

        this.close.classList.add('close');
        this.minimize.classList.add('minimize');
        this.maximize.classList.add('maximize');

        this.traffic_dom = document.createElement('div');
        this.traffic_dom.classList.add('traffic_dom');

        this.traffic_dom.appendChild(this.minimize);
        this.traffic_dom.appendChild(this.maximize);
        this.traffic_dom.appendChild(this.close);

        this.trafic_events(this.close, this.minimize, this.maximize, this.window_body.id);

        return this.traffic_dom;
    }

    windowEvents(eventType, window, controller) {
        if (this.window_mode == 'locomotion') {

            this.windowState = {
                'move': false,
                'initial_X': 0,
                'initial_Y': 0,
                'final_X': 0,
                'final_Y': 0,
                'isMaximized': false
            }

            controller.addEventListener('mousedown', (e) => {
                this.move_initiator(e);
                const elem = document.querySelectorAll('.window');
                elem.forEach(y => y.style.zIndex = '2');
                window.style.zIndex = '3';
            })
            controller.addEventListener('mousemove', (e) => {
                this.move_maker(e, window);

            })
            controller.addEventListener('mouseleave', (e) => {
                this.move_intermediate(e);

            })
            controller.addEventListener('mouseup', (e) => {
                this.move_stopper(e);
            })

        }

        else {
            try {
                controller.removeEventListener('mousedown', this.move_initiator);
                controller.removeEventListner('mousemove', this.move_maker);
                controller.removeEventListner('mouseleave', this.move_intermediate);
                controller.removeEventListner('mouseup', this.move_stopper);
            }
            catch (errr) {
                console.log(errr);
            }
        }


    }
    trafic_events(close, minimize, maximize, windowID) {
        close.onclick = () => {
            const window = document.getElementById(windowID);
            window.classList.add('sink');
            window.style.animationDuration = '.3s'
            setTimeout(() => {
                document.getElementById(windowID).remove();
            }, 400);
        }
        minimize.onclick = () => {
            if(this.window_body.getAttribute('data-ismin') == 'false'){
                this.window_canvas.style.height = '0%';
                this.window_body.style.width = '15%';
                this.traffic_dom.style.width = '25%';
                this.icon.style.display = 'none';
                console.log('minimized');
                this.window_body.setAttribute('data-ismin','true');
                this.updateState();
            }            
            else{
                this.window_canvas.style.height = '100%';
                this.window_body.style.width= this.config.width;
                this.traffic_dom.style.width = '12%';
                this.icon.style.display = 'flex';
                console.log('normal');
                this.window_body.setAttribute('data-ismin','false');
                this.updateState();
            }
        }
        maximize.onclick = () => {
            const window = document.getElementById(windowID);
            if (window.getAttribute('data-state') == 'max') {
                this.window_mode = 'static';
                window.setAttribute('data-state', 'min');
                this.window_canvas.style.height = '100%';
                console.log(this.window_state.current_state.canvas_width);
                this.traffic_dom.style.width = '12%';
                this.windowState.isMaximized = true;
                this.windowEvents(false, this.window_body, this.window_head);
                this.window_head.style.height = '5%';
                window.classList.add('win_maximize');
                this.updateState();
            }
            else {
                this.window_mode = 'max';
                window.setAttribute('data-state', 'max');
                this.window_head.style.height = '7%';
                window.classList.remove('win_maximize');
                this.windowState.isMaximized = false;
                this.updateState();
            }

        }
    }

    move_initiator(e) {
        this.windowState.move = true;
        this.windowState.initial_X = e.clientX;
        this.windowState.initial_Y = e.clientY;
        this.updateState();
    }

    move_maker(e, window) {
        if (this.windowState.move && !this.windowState.isMaximized) {
            this.windowState.final_X = e.clientX;
            this.windowState.final_Y = e.clientY;

            window.style.top = (window.offsetTop - (this.windowState.initial_Y - this.windowState.final_Y) + 'px');
            window.style.left = (window.offsetLeft - (this.windowState.initial_X - this.windowState.final_X) + 'px');

            this.canDOm.style.opacity = '0.5';
            this.windowState.initial_X = e.clientX;
            this.windowState.initial_Y = e.clientY;
            // this.window_state.current_state.window_position_x = window.style.left;
            // this.window_state.current_state.window_position_y = window.style.top;
            this.updateState();
        }
    }

    move_intermediate(e) {
        this.windowState.move = false;
        this.windowState.initial_X, this.windowState.initial_Y, this.windowState.final_X, this.windowState.final_Y = 0;
        this.canDOm.style.opacity = '1';
        this.updateState();
    }

    move_stopper(e) {
        this.windowState.move = false;
        this.windowState.initial_X, this.windowState.initial_Y, this.windowState.final_X, this.windowState.final_Y = 0;
        this.canDOm.style.opacity = '1';
        this.updateState();
    }

    updateState(){
        this.window_state.step_backward = this.window_state.current_state;
        
        this.window_state.current_state.canvas_document  = null;
        this.window_state.current_state.canvas_width = this.window_canvas.style.width;
        this.window_state.current_state.canvas_height = this.window_canvas.style.height;
        this.window_state.current_state.head_height = this.head.style.height;
        this.window_state.current_state.head_width = this.head.style.width;
        this.window_state.current_state.height = this.window_body.style.height;
        this.window_state.current_state.width = this.window_body.style.width;
        this.window_state.current_state.window_arm = this.config;
        this.window_state.current_state.window_icon = this.icon_image;
        this.window_state.current_state.window_mode = this.window_body.getAttribute('data-mode');
        this.window_state.current_state.window_position_x = this.window_body.style.left;
        this.window_state.current_state.window_position_y = this.window_body.style.top;
        this.window_state.current_state.window_title = this.title;
        
        console.log(this.window_state.current_state);
    }

}

// let windowDraw = new drawWindow({
// 'frameStyle': 'shyama',
// 'height': '30rem',
// 'width': '50rem',
// 'icon': 'none',
// 'isToolwindow': false,
// 'windowShadow': false,
// "title": 'file window',
// 'type': 'window'
// });

