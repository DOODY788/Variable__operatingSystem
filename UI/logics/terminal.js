
const id_count = 0;

const loadSession = ()=>{
    const dom = document.querySelector('.codespace');
    const session_id = `terminalSession_${id_count}`;
    const sessionDom = document.createElement('div');
    sessionDom.setAttribute('class','session-dom');
    sessionDom.id=session_id;
    sessionDom.innerHTML = '$root-user:'
    const inpuDiv = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('class','inp');
    // id_count =+ 1;
    inpuDiv.appendChild(input);
    sessionDom.append(inpuDiv);
    dom.appendChild(sessionDom);
    input.focus();
    input.addEventListener('keydown',(e)=>{
        // e.preventDefault();
        if(e.keyCode == 13){
            input.readOnly = true
            loadSession();
        }
    })
}
loadSession();
// document.querySelector('.sessionDom').scrollIntoView();