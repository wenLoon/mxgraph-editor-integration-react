import React,{Component} from 'react';
import Mxgraph from './component/Mxgraph';
import './App.scss'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="main">
                {/* <p>Hello World</p>  */}
                <Mxgraph />
            </div>
        );
    }
}

export default App;

// ReactDom.render(<App />,document.getElementById('root'));