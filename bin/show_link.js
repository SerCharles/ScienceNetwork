var width = 1800, height = 1200;
function cmp(a, b)
{
	return a.closeness < b.closeness ? 1 : -1;
}
function CreateLink(nodes, edges,representation){

	var mat = new Array();
	for(var i = 0; i < nodes.length; ++i)
	{
		if(nodes[i].link==nodes[representation].link)
		{
			var d = {
				"name" : nodes[i].name,
				"closeness" : nodes[i].closeness,
				"id" : nodes[i].id - 1
			}
			mat.push(d);
		}
	} 
	var temp = d3.select("body")
	.select("#mainbody").select("#maincontent")
	.select("#demo")
	.select("svg").selectAll("*");
	temp.remove();


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
				   .style("stroke" , function(d)
				{
					if(d.source.link==nodes[representation].link&&d.target.link==nodes[representation].link)
					{
						return "#9b30ff";
					}
					else return "#bdbdbd";
				})
			       .style("stroke-width" ,".5");
            var circles;
            
                    circles= svg.selectAll(".forceCircle")
					 .data(nodes)
					 .enter()
					 .append("circle")
					 .attr("class", "forceCircle")
					 .attr("cx", function(d) { return d.x; })
				   	 .attr("cy", function(d) { return d.y; })
					 .attr("r", function(d){
						if(d.link==nodes[representation].link&&d.closeness<=7000)
						{
							return 18;
						}
						else if(d.link==nodes[representation].link&&d.closeness<=8000)
						{
						   return 12;
						}
						else if(d.link==nodes[representation].link&&d.closeness<=10000)
                       {
                           return 9;
					   }
					   else if(d.link==nodes[representation].link)
					   {
						   return 6;
					   }
                       else return 3;})
					 .style("fill", function(d){
						if(d.link==nodes[representation].link&&d.closeness<=7000)
						{
							return "#cd0000";
						}
						else if(d.link==nodes[representation].link&&d.closeness<=8000)
						 {
							return "#bf3eff";
						 }
						else if(d.link==nodes[representation].link&&d.closeness<=10000)
						{
							return "#9b30ff";
						}
                        else if(d.link==nodes[representation].link)
                       {
                           return "#8deeee";
                       }
						else return "#eeee00";
					 })
					 .style("stroke-width", ".5")
					 .style("stroke", "#8b4513")
					 .call(force.drag);
	circles.append("title")
		   .text(function(d) { return d.name; });
	

	mat.sort(cmp);
	document.getElementById("l1").innerText = "";
	document.getElementById("l2").innerText = "";
	document.getElementById("l3").innerText = "";
	document.getElementById("l4").innerText = "";
	document.getElementById("l5").innerText = "";
	if(mat.length > 0)
        document.getElementById("l1").innerText = "节点编号：" + mat[mat.length - 1].id + "\n 作者姓名：" + mat[mat.length - 1].name;
	if(mat.length > 1)
        document.getElementById("l2").innerText = "节点编号：" + mat[mat.length - 2].id + "\n 作者姓名：" + mat[mat.length - 2].name;
	if(mat.length > 2)
        document.getElementById("l3").innerText = "节点编号：" + mat[mat.length - 3].id + "\n 作者姓名：" + mat[mat.length - 3].name;
	if(mat.length > 3)
        document.getElementById("l4").innerText = "节点编号：" + mat[mat.length - 4].id + "\n 作者姓名：" + mat[mat.length - 4].name;
	if(mat.length > 4)
        document.getElementById("l5").innerText = "节点编号：" + mat[mat.length - 5].id + "\n 作者姓名：" + mat[mat.length - 5].name;


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

