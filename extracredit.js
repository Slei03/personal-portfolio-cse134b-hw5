class ReactButtonCount extends React.Component{

    state = {clickCount: 0}

    incrementClicks = ()=>{
        this.setState(state => ({clickCount: state.clickCount+1}))
    }

    render(){
        const btnStyle = {
            fontSize: '1.2rem'  
        };

        return (
            <button style={btnStyle} onClick={this.incrementClicks}>Times Clicked: {this.state.clickCount}</button>
        )
    }
}

const btnCount = document.createElement("button-count");
const shadow = btnCount.attachShadow({mode: 'open'});
const shadowRoot = ReactDOM.createRoot(btnCount.shadowRoot);
document.getElementById("extracredit").appendChild(btnCount);
shadowRoot.render(<ReactButtonCount/>);