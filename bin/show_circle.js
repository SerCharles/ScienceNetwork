var width = 1800, height = 1200;

function CreateCircle(nodes, edges,parent,representation){

	var temp = d3.select("body")
	.select("#mainbody").select("#maincontent")
	.select("#demo")
	.select("svg").selectAll("*");
	temp.remove();
	var html = "圈子中的成员为：<br>";
	for(var i = 0, len = nodes.length; i < len; ++i){
		if(parent[nodes[i].id-1]==parent[representation])
			html += nodes[i].name + "<br>";
	}
	document.getElementById("author_list").innerHTML = html;


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
				.select("svg")
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
                  .style("stroke", "#bdbdbd")
			       .style("stroke-width" , ".5");

	var circles = svg.selectAll(".forceCircle")
					 .data(nodes)
					 .enter()
					 .append("circle")
					 .attr("class", "forceCircle")
					 .attr("cx", function(d) { return d.x; })
				   	 .attr("cy", function(d) { return d.y; })
					 .attr("r", function(d)
					{
						if(parent[d.id-1]==parent[representation])
						{
							return 12;
						}
						else
						{
							return 4;
						}
					})
					 .style("fill", function(d)
					{
						if(parent[d.id-1]==parent[representation])
						 {
							 return "#cd0000";
						 }
						 else 
						 {
                             return "#66ccff";
						 }
					})
					 .style("stroke-width", ".5")
					 .style("stroke", "#8b4513")
					 .call(force.drag);

	circles.append("title")
		   .text(function(d) { return d.name; });

	var texts = svg.selectAll(".forceText")
				   .data(nodes)
				   .enter()
				   .append("text")
                   .attr("class", "forceText")
              .attr("font-size", "12px")
        
                   .style("font-family","Times New Roman")
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

	force.on();
}



