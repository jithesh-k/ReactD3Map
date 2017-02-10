import React, { Component } from 'react';
import logo from './logo.svg';
//import * as d3 from 'd3';
import CountyMap from './components/CountyMap';
import './App.css';
import * as d3 from 'd3';
class App extends Component {
    state = {}
  
    componentWillMount(){
      d3.queue()
        .defer(d3.json,'data/us.json')
        .await((error,us)=> {
            this.setState({usTopoJson: us});
        });
    }
  
  render() {
    return (
      <div className="App">
        <svg width="1080" height="600">
          <CountyMap usTopoJson={this.state.usTopoJson} width={1080} height={600}/>
        </svg>
        
      </div>
    );
  }
}


export default App;
