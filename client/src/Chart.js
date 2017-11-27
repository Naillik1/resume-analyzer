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

    const margin = { top: 20, right: 20, bottom: 30, left: 150 };
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

    // Create x axis and label
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    svg.append('text')
      .attr("class", "xaxis_label")
      .attr("transform", `translate( ${width/2}, ${height + margin.top + 10})`)
      .style("text-anchor", "middle")  
      .text("Relevance");

    // Create y axis and label
    svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y));
    svg.append('text')
      .attr("class", "yaxis_label")
      .attr("transform", 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")  
      .text("Keyword");


    // Create bars
    svg.selectAll('bar')
      .data(data)
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
    const margin = { top: 20, right: 20, bottom: 30, left: 150 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create scales
    const x = d3.scaleLinear().range([0, width]).domain([0, 1]);
    const y = d3.scaleBand().rangeRound([height, 0]).domain(data.map( (d) => d.text)).padding(0.1);

    const svg = d3.select(faux).select('svg').select('g');

    svg.select('.y.axis').transition().duration(300).call(d3.axisLeft(y));

    //Rejoin data based on differing keys
    let bar = svg.selectAll('.bar').data(data, (d) => d.key);

    // Remove bars without data
    bar.exit().transition().duration(300)
      .attr('x', x(0))
      .attr('width', width - x(0))
      .remove();
    // Add bars for new data
    bar.enter().append('g')
      .attr('class', 'bar')
      .append('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.text))
      .attr('width', (d) => x(d.relevance))
      .attr('height', y.bandwidth());
    //Update to new positions
    bar.selectAll('rect').transition().duration(300)
      .attr('x', 0)
      .attr('y', (d) => y(d.text))
      .attr('width', (d) => x(d.relevance))
      .attr('height', y.bandwidth());

    svg.selectAll('.bar').selectAll('.label').remove();
    
    svg.selectAll('.bar')
      .append('text')
      .attr('class', 'label')
      .attr('x', (d) => (x(d.relevance) - 100))
      .attr('y', (d) => y(d.text) + (y.bandwidth()/2))
      .attr("dy","0.35em")
      .text( (d) => d.relevance);

    this.props.animateFauxDOM(800);
  }

}

export default withFauxDOM(Chart); 
