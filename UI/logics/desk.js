import Window from './draw.js'

class loadDekstop {
    constructor() {
        this.Desktop = document.querySelector('.Desktop');
        this.basicSetup();
        this.loadTaskbar();
        this.loadapps();
    }

    basicSetup() {
        this.desk_frame = document.createElement('div');
        this.desk_frame.id = 'desk_frame';
        this.Desktop.appendChild(this.desk_frame);
        let keypressed = {}

        document.body.addEventListener('keydown', (e) => {
            keypressed[e.key] = true;
            if (keypressed['Shift'] && keypressed['A']) {
                alert('home activated');
            }
        })

        document.addEventListener('keyup', (e) => {
            delete keypressed[e.key];
        })
    }

    loadapps() {
        let appdata = [
            ['https://cdn-icons-png.flaticon.com/512/673/673065.png', 'Terminal'],
            ['https://cdn-icons-png.flaticon.com/512/3735/3735057.png', 'Files'],
            ['https://cdn-icons-png.flaticon.com/512/148/148825.png', 'Storage'],
            ['https://cdn-icons-png.flaticon.com/512/807/807262.png', 'Settings'],
        ]
        for (let i = 0; i < appdata.length; i++) {
            let image = appdata[i];
            this.appframe = document.createElement('div');
            this.appframe.id = image[1];
            this.appframe.classList.add('app_frame')
            this.appbackground = document.createElement('img');
            this.app_name = document.createElement('div');
            this.app_name.innerHTML = image[1];
            this.appframe.setAttribute('data-appname',image[1])
            this.app_name.classList.add('app_name');
            this.appbackground.src = image[0];
            this.appframe.appendChild(this.appbackground);
            this.appframe.appendChild(this.app_name);
            this.desk_frame.appendChild(this.appframe);
        }
        const apps = document.querySelectorAll('.app_frame');
        apps.forEach((y)=>{
            y.addEventListener('dblclick',(e)=>{
                this.loadWindow(y,e.clientX,e.clientY);
            })
        })
    }

    loadTaskbar() {
        this.task_frame = document.createElement('div');
        this.task_bar = document.createElement('div');
        this.task_bar.classList.add('task_bar');
        this.task_frame.classList.add('task_frame');
        this.task_frame.appendChild(this.task_bar);
        this.Desktop.appendChild(this.task_frame);

        this.task_frame.addEventListener('mouseenter', (e) => {
            this.task_bar.style.bottom = '0';
        })
        this.task_frame.addEventListener('mouseleave', (e) => {
            this.task_bar.style.bottom = '-100%';
        })
    }

    loadWindow(root,initialX,initialY) {
        console.log(root.getAttribute("data-appname"))
        const window_frame = new Window({
            'frameStyle': 'shyama',
            'height': 'fit-content',
            'width': '50rem',
            'icon': 'none',
            'isToolwindow': false,
            'windowShadow': false,
            "title":root.getAttribute("data-appname"),
            'type': 'window',
            'initialX':initialX,
            'initialY':initialY,
            'internalFile':`../armature/${root.getAttribute("data-appname")}.html`
        });
    }

}

let Desktoploader = new loadDekstop();