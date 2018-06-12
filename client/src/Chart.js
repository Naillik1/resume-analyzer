import React, { Component } from 'react';
import * as d3 from 'd3';
import {withFauxDOM} from 'react-faux-dom';
import './Chart.css';

class Chart extends Component {
  render() {
    return (
        <div>
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

    const margin = this.props.margin;
    const width = this.props.width;
    const height = this.props.height;
    
    // Create scales
    const maxRelevance = data[data.length-1].relevance
    const xDomainMax = Math.max( Math.ceil(maxRelevance * 10) / 10, 0.3 ).toFixed(2);
    const x = d3.scaleLinear().range([0, width]).domain([0, xDomainMax]);
    const y = d3.scaleBand().rangeRound([height, 0]).domain(data.map( (d) => d.text)).padding(0.1);

    let svg = d3.select(faux).append('svg')
      .style('padding', 20)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Create chart title
    svg.append('text')
      .attr('class', 'title')
      .attr('x', (width / 2))
      .attr('y', 0 - (margin.top / 4))
      .style('text-anchor', 'middle')
      .text(`Most Relevant Keywords`);

    // Create x axis and label
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    svg.append('text')
      .attr('class', 'xaxis_label')
      .attr('transform', `translate( ${width/2}, ${height + margin.top + 10})`)
      .style('text-anchor', 'middle')  
      .text('Relevance');

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
       .text( (d) => d.relevance.toFixed(4));
    
    this.props.animateFauxDOM(800);
  }

  updateD3() {
    const faux = this.props.connectFauxDOM('div', 'chart');
    const data = this.props.data.sort( (a, b) => a.relevance - b.relevance);
    
    const width = this.props.width;
    const height = this.props.height;
    
    // Create scales
    const maxRelevance = data[data.length-1].relevance
    const xDomainMax = Math.max( Math.ceil(maxRelevance * 10) / 10, 0.3 ).toFixed(2);
    const x = d3.scaleLinear().range([0, width]).domain([0, xDomainMax]);
    const y = d3.scaleBand().rangeRound([height, 0]).domain(data.map( (d) => d.text)).padding(0.1);

    const svg = d3.select(faux).select('svg').select('g');
    
    // Rescale y-axis
    svg.select('.y.axis').transition().duration(300).call(d3.axisLeft(y));

    // Rejoin data based on differing keys
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
    // Move bars to new positions
    bar.selectAll('rect').transition().duration(300)
      .attr('x', 0)
      .attr('y', (d) => y(d.text))
      .attr('width', (d) => x(d.relevance))
      .attr('height', y.bandwidth());
    
    // Remove all bar labels
    svg.selectAll('.bar').selectAll('.label').remove();
    // Attach new labels
    bar.enter()
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
