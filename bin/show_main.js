var width = 1800, height = 1200;

function CreateForce(nodes, edges){
	var force = d3.layout.force()
			  .nodes(nodes)
			  .links(edges)
			  .size([width, height])
			  .linkDistance(90)
			  .charge(-40);

	force.start();

	console.log(nodes);
	console.log(edges);

	var svg = d3.select("body")
				.select("#mainbody").select("#maincontent")
				.select("#demo")
				.append("svg")
				.attr("width", width)
				.attr("height", height);

	var color = d3.scale.category20();

    var lines = svg.selectAll(".forceLine")
        .data(edges)
        .enter()
        .append("line")
        .attr("class", "forceLine")
				   .attr("x1", function(d) { return d.source.x; })
			 	   .attr("y1", function(d) { return d.source.y; })
			 	   .attr("x2", function(d) { return d.target.x; })
			       .attr("y2", function(d) { return d.target.y; })
			       .style("stroke" , "#bdbdbd")
			       .style("stroke-width" , ".5");

	var circles = svg.selectAll(".forceCircle")
					 .data(nodes)
					 .enter()
					 .append("circle")
					 .attr("class", "forceCircle")
					 .attr("cx", function(d) { return d.x; })
				   	 .attr("cy", function(d) { return d.y; })
					 .attr("r", 4)
					 .style("fill", "#eeee00")
					 .style("stroke-width", ".5")
					 .style("stroke", "#8b4513")
					 .call(force.drag);

	circles.append("title")
		   .text(function(d) { return d.name; });

	var texts = svg.selectAll(".forceText")
				   .data(nodes)
				   .enter()
        .append("text")
        .attr("font-size", "12px")
        .style("font-family", "Times New Roman")
				   .attr("class", "forceText")
				   .attr("x", function(d){ return d.x; })
				   .attr("y", function(d){ return d.y; })	   
				   .text(function(d) { return d.index; });

	force.on("tick", function(){
		lines.attr("x1", function(d) { return d.source.x; })
			 .attr("y1", function(d) { return d.source.y; })
			 .attr("x2", function(d) { return d.target.x; })
			 .attr("y2", function(d) { return d.target.y; });

		circles.attr("cx", function(d) { return d.x; })
			   .attr("cy", function(d) { return d.y; });

		texts.attr("x", function(d){ return d.x; })
			 .attr("y", function(d){ return d.y; })
	});

	force.on()
}

d3.json("data/out_author.json", function(error, data){
	if (error){
		return console.error(error);
	}
	CreateForce(data.nodes, data.edges);
});

