// D3BarChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const HorizontalBar = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        const barHeight = 25;
        const marginTop = 30;
        const marginRight = 0;
        const marginBottom = 10;
        const marginLeft = 500;
        const width = 928;
        const height = Math.ceil((data.length + 0.1) * barHeight) + marginTop + marginBottom;

        // Create the scales.
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.frequency)])
            .range([marginLeft, width - marginRight]);

        const y = d3.scaleBand()
            .domain(d3.sort(data, d => -d.frequency).map(d => d.letter))
            .rangeRound([marginTop, height - marginBottom])
            .padding(0.1);

        // Create a value format.
        const format = x.tickFormat(20);

        // Create the SVG container.
        svg
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

        // Append a rect for each letter.
        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", x(0))
            .attr("y", d => y(d.letter))
            .attr("width", d => x(d.frequency) - x(0))
            .attr("height", y.bandwidth())
            .attr("fill", "steelblue");

        // Append a label for each letter.
        svg.selectAll("text")
            .data(data)
            .join("text")
            .attr("x", d => x(d.frequency))
            .attr("y", d => y(d.letter) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", -4)
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .text(d => format(d.frequency))
            .call(text => text.filter(d => x(d.frequency) - x(0) < 20) // short bars
                .attr("dx", +4)
                .attr("fill", "black")
                .attr("text-anchor", "start"));

        // Create the axes.
        svg.append("g")
            .attr("transform", `translate(0,${marginTop})`)
            .call(d3.axisTop(x).ticks(width / 80))
            .call(g => g.select(".domain").remove());

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).tickSizeOuter(0));

    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default HorizontalBar;
