var width = 1800, height = 1200;
function cmp(x, y){
	return x.between < y.between ? 1 : -1;
}

function CreateImportance(nodes, edges) {
    
    var newnodes = new Array();
    for (var i = 0; i < nodes.length; ++i) {
        
            var d = {
                "name": nodes[i].name,
                "between": nodes[i].between,
                "id": nodes[i].id - 1
            }
            newnodes.push(d);

    } 
    newnodes.sort(cmp);
	document.getElementById("l1").innerText = "教授姓名:" + newnodes[0].name + "\n介数中心度:" + newnodes[0].between;
	document.getElementById("l2").innerText = "教授姓名:" + newnodes[1].name + "\n介数中心度:" + newnodes[1].between;
	document.getElementById("l3").innerText = "教授姓名:" + newnodes[2].name + "\n介数中心度:" + newnodes[2].between;
	document.getElementById("l4").innerText = "教授姓名:" + newnodes[3].name + "\n介数中心度:" + newnodes[3].between;
	document.getElementById("l5").innerText = "教授姓名:" + newnodes[4].name + "\n介数中心度:" + newnodes[4].between;

	var force = d3.layout.force()
			  .nodes(nodes)
			  .links(edges)
			  .size([width, height])
			  .linkDistance(90)
			  .charge(-46);

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
        .style("stroke", "#bdbdbd")
			       .style("stroke-width" , ".5");

            var circles;
            
                    circles= svg.selectAll(".forceCircle")
					 .data(nodes)
					 .enter()
					 .append("circle")
					 .attr("class", "forceCircle")
					 .attr("cx", function(d) { return d.x; })
				   	 .attr("cy", function(d) { return d.y; })
					 .attr("r", function(d){
						 if(d.between>=100000)
						 {
							 return 20;
						 }
						else if(d.between>=50000)
						 {
							 return 15;
						 }
						else if(d.between>=10000) 
						{
							return 12;
						}
						else if(d.between>=5000)
						{
						    return 9;
						}
						else if(d.between>=1000)
						{
						    return 6;
						}
						else return 3;})
					 .style("fill", function(d){
						 if(d.between>=100000)
						 {
							 return "#cd0000"
						 }
						else if(d.between>=50000) 
						{
							return "#d2961e";
						}
						else if(d.between>=10000) 
						{
							return "#eeee00";
						}
						else if(d.between>=5000)
						{
						    return "#90ee90";
						}
						else if(d.between>=1000)
						{
						    return "#66ccff";
						}
						else return "#551a8b";
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
        .style("font-family", "Times New Roman")
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

	CreateImportance(data.nodes, data.edges);
});
