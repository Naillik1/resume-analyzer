import React, { Component } from 'react';
import * as d3 from 'd3';
import {withFauxDOM} from 'react-faux-dom';
import './App.css';

class Chart extends Component {
  render() {
    return (
      <div>
      {this.props.chart}    
      </div>
);
  }

  componentDidMount () {
    console.log('componentDidMount()');
    const faux = this.props.connectFauxDOM('div', 'chart');
    const data = this.props.keywords.sort( (a, b) => a.relevance - b.relevance);
    console.log(data);
    const margin = {
      top: 15,
      right: 25,
      bottom: 15,
      left: 200
    };

    const width = 900 - margin.left - margin.right,
          height = 450 - margin.top - margin.bottom;

    let svg = d3.select(faux).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    let g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const x = d3.scaleLinear()
      .range([0, width])
      .domain([0, 1]);
    
    const y = d3.scaleBand()
      .rangeRound([height, 0])
      .domain(data.map( (d) => d.text)).padding(0.1);

    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y));

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('y', (d) => y(d.text))
      .attr('width', (d) => x(d.relevance));

    this.props.animateFauxDOM(2000);
  }
  
}

export default withFauxDOM(Chart); 
