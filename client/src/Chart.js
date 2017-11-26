import React, { Component } from 'react';
import * as d3 from 'd3';
import {withFauxDOM} from 'react-faux-dom';
import './Chart.css';

class Chart extends Component {
  render() {
    return (
        <div className='barChart'>
          {this.props.chart}    
        </div>
        );
  }

  componentDidMount() {
    this.renderD3();
  }

  renderD3 () {
    const faux = this.props.connectFauxDOM('div', 'chart');
    const data = this.props.keywords.sort( (a, b) => a.relevance - b.relevance);

    const margin = {
      top: 15,
      right: 25,
      bottom: 20,
      left: 200
    };

    const width = 700 - margin.left - margin.right,
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

    g.selectAll('bar')
      .data(data)
      .enter().append('g')
      .attr('class', 'bar')
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.text))
      .attr('width', (d) => x(d.relevance))
      .attr('height', y.bandwidth())

    let bars = g.selectAll('.bar')
    
    bars.append('text')
    .attr('class', 'label')
    .attr('x', (d) => (x(d.relevance) - 100))
    .attr('y', (d) => y(d.text) + (y.bandwidth()/2 + 5))//y(d.text))
    .text( (d) => d.relevance)

    this.props.animateFauxDOM(2000);
  }

}

export default withFauxDOM(Chart); 
