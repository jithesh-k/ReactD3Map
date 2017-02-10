import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

const County = ({geoPath,feature}) => (
    <path d={geoPath(feature)} />
);

class CountyMap extends Component {
  constructor(props) {
      super(props);

      this.projection = d3.geoMercator()
                            .scale(180);
      this.geoPath = d3.geoPath()
                        .projection(this.projection);
      this.updateD3(props);
  }

  componentWillReceiveProps(newProps){
      this.updateD3(newProps);
  }
  updateD3(props){
      this.projection.translate([props.width/2,props.height/2]);
  }
  render(){
      if(!this.props.usTopoJson){
          return null;
      }else{
          let color = 'rgb(8,48,107)';
          const us = this.props.usTopoJson,
                statesMesh=topojson.mesh(us,us.objects.countries,(a,b) => a !==b),
                countries = topojson.feature(us,us.objects.countries).features;
            return(
                <g>
                <path d={this.geoPath(statesMesh)} style={{fill:color,stroke:'#fff',
                                                            strokeLinejoin:'round'}}/>

                {countries.map((feature) => <County geoPath={this.geoPath} feature={feature}
                                                key={feature.id} />)}

                </g>
            );
      }
      
  }
}

export default CountyMap;