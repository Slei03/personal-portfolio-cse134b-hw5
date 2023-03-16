class ButtonCount extends HTMLElement{
    constructor(){
        super();
        const button = document.createElement("button");
        let btnClickCount = 0;

        button.innerText = "Times Clicked: " + btnClickCount;

        button.addEventListener("click", ()=>{
            btnClickCount++;
            button.innerText = "Times Clicked: " + btnClickCount;
        });

        const style = document.createElement("style");
        style.textContent = `
            button{
                font-size: 1.2rem;
            }
        `
        const shadow = this.attachShadow({mode: "open"});
        shadow.appendChild(button);
        shadow.appendChild(style);
    }
}

customElements.define('button-count', ButtonCount);