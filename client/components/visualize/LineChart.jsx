import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ title, data }) => {
    const svgRef = useRef();

    useEffect(() => {
        // Define the dimensions and margins of the chart
        const width = 928;
        const height = 500;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;

        // Select the SVG element using D3
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .style('max-width', '100%')
            .style('height', 'auto');

        // Clear any previous contents of the SVG element
        svg.selectAll('*').remove();

        // Parse the data
        const parsedData = data.map(d => ({
            letter: d.letter,
            frequency: +d.frequency
        }));

        // Declare the x (horizontal position) scale.
        const x = d3.scaleBand()
            .domain(parsedData.map(d => d.letter))
            .range([marginLeft, width - marginRight])
            .padding(0.1);

        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear()
            .domain([0, d3.max(parsedData, d => d.frequency)]).nice()
            .range([height - marginBottom, marginTop]);

        // Declare the line generator.
        const line = d3.line()
            .x(d => x(d.letter) + x.bandwidth() / 2)  // adjust x to center the line on the bar
            .y(d => y(d.frequency));

        // Add the x-axis.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        // Add the y-axis, remove the domain line, add grid lines and a label.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(`${title}`));

        // Append a path for the line.
        svg.append("path")
            .datum(parsedData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line);

    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default LineChart;
