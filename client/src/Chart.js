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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.updateD3();
    }
  }

  componentDidMount() {
    this.renderD3();
  }

  renderD3 () {
    const faux = this.props.connectFauxDOM('div', 'chart');
    const data = this.props.data.sort( (a, b) => a.relevance - b.relevance);

    const margin = { top: 20, right: 20, bottom: 30, left: 200 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    // Create scales
    const x = d3.scaleLinear().range([0, width]).domain([0, 1]);
    const y = d3.scaleBand().rangeRound([height, 0]).domain(data.map( (d) => d.text)).padding(0.1);

    let svg = d3.select(faux).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create axes
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
    svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y));

    // Create bars
    svg.selectAll('bar')
      .data(data, (d) => d)
      .enter().append('g')
      .attr('class', 'bar')
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.text))
      .attr('width', (d) => x(d.relevance))
      .attr('height', y.bandwidth());

    // Add bar labels
    svg.selectAll('.bar')
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (x(d.relevance) - 100))
      .attr('y', (d) => y(d.text) + (y.bandwidth()/2))
      .attr("dy","0.35em")
      .text( (d) => d.relevance);

    this.props.animateFauxDOM(800);
  }

  updateD3() {
    const data = this.props.data.sort( (a, b) => a.relevance - b.relevance);
    const faux = this.props.connectFauxDOM('div', 'chart');
    const margin = { top: 20, right: 20, bottom: 30, left: 200 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
   console.log(data); 
    // Create scales
    const x = d3.scaleLinear().range([0, width]).domain([0, 1]);
    const y = d3.scaleBand().rangeRound([height, 0]).domain(data.map( (d) => d.text)).padding(0.1);
    
    const svg = d3.select(faux).select('svg').select('g');

    svg.select('.x.axis').transition().duration(300).call(d3.axisBottom(x));
    svg.select('.y.axis').transition().duration(300).call(d3.axisLeft(y));
    
    //Rejoin data
    let bar = svg.selectAll('.bar').data(data);
    console.log(bar);

    bar.exit().transition().duration(300)
      .attr('x', x(0))
      .attr('width', width - x(0))
      .remove();

    bar.enter().append('g')
      .attr('class', 'bar')
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.text))
      .attr('width', (d) => x(d.relevance))
      .attr('height', y.bandwidth());
    
    // Add bar labels
    svg.selectAll('.label')
      .attr('x', (d) => (x(d.relevance) - 100))
      .attr('y', (d) => y(d.text) + (y.bandwidth()/2))
      .attr("dy","0.35em")
      .text( (d) => d.relevance);

    bar.selectAll('rect').transition().duration(300)
      .attr('x', 0)
      .attr('y', (d) => y(d.text))
      .attr('width', (d) => x(d.relevance))
      .attr('height', y.bandwidth());
    
    
    this.props.animateFauxDOM(800);
  }

}

export default withFauxDOM(Chart); 
