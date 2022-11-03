const S_HEIGHT = 400;
const S_WIDTH = 650;
const S_MARGINS = {left: 75, right: 50, top: 50, bottom: 50};

const S_VIS_HEIGHT = S_HEIGHT - S_MARGINS.top - S_MARGINS.bottom;
const S_VIS_WIDTH = S_WIDTH - S_MARGINS.left - S_MARGINS.right;

// scatterplot frame
const FRAME_SCATTER = d3.select("#col1")
						.append("svg")
							.attr("height", S_HEIGHT)
							.attr("width", S_WIDTH)
							.attr("class", "frame");

function build_timeseries() {
	d3.csv("data/cityhall.csv").then((data) => {

		const MAX_X = d3.max(data, (d) => {return length(d);})
		const X_SCALE = d3.scaleLinear()
							.domain([MIN_X - 3, MAX_X + 3])
							.range([0, S_VIS_WIDTH]);

		// y-axis scaling (or change to 0-100%?)
		const MIN_Y = d3.min(data, (d) => {return parseInt(d.Total_Demand_KW);})
		const MAX_Y = d3.max(data, (d) => {return parseInt(d.Total_Demand_KW);})
		const Y_SCALE = d3.scaleLinear()
							.domain([MIN_Y - 3, MAX_Y + 3])
							.range([S_VIS_HEIGHT, 0]);

		// x-axis
		FRAME_SCATTER.append("g")
						.attr("transform", "translate(" + S_MARGINS.left + "," + (S_VIS_HEIGHT + S_MARGINS.top) + ")")
						.call(d3.axisBottom(X_SCALE).ticks(10))
							.attr("font-size", "15px")

		// x-axis label
		FRAME_SCATTER.append("text")
						.style("text-anchor", "middle")
						.attr("transform", "translate(" + (S_WIDTH / 2) + "," + (S_HEIGHT - 10) + ")")
					    .text("Date");

		// y-axis
		FRAME_SCATTER.append("g")
						.attr("transform", "translate(" + S_MARGINS.left + "," + S_MARGINS.top + ")")
						.call(d3.axisLeft(Y_SCALE).ticks(8))
							.attr("font-size", "15px");

		// y-axis label
		FRAME_SCATTER.append("text")
						.style("text-anchor", "middle")
						.attr("transform", "rotate(-90)")
					    .attr("y", (S_MARGINS.left - 40))
					    .attr("x", 0 - S_HEIGHT / 2)
					    .text("Energy Usage");

		// add points for the data
		FRAME_SCATTER.selectAll("points")
						.data(data)
						.enter()
						.append("circle")
							.attr("id", (d) => {return d.name;})
							.attr("cx", (d) => {return (S_MARGINS.left + X_SCALE(d.DateTime_Measured));})
							.attr("cy", (d) => {return (S_MARGINS.top + Y_SCALE(d.Total_Demand_KW));})
							.attr("class", "point");
	})
}
build_timeseries();