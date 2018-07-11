var width = 1800, height = 1200;

function CreatePath(nodes, edges,short_path,begin_path,end_path){

	var element = document.getElementById("demo");
	var parent = element.parentNode;
	element.parentNode.removeChild(element);
	var child = document.createElement('demo');
	child.id = 'demo';
	parent.appendChild(child);
	if(short_path[begin_path][end_path].size==0||short_path[begin_path][end_path].size==-1)
	{
		var html = "此两点不连通或两点相同！";
		document.getElementById("node_list").innerHTML = html;
		return;
	}
	var html = "路径长度为:";
	html += short_path[begin_path][end_path].path.length - 1 + "<br>路径上的教授为:<br>";
	for(var i = 0; i < short_path[begin_path][end_path].path.length; ++i)
		html += "节点编号：" + (nodes[short_path[begin_path][end_path].path[i] - 1].id - 1) + "<br>作者姓名：" + nodes[short_path[begin_path][end_path].path[i] - 1].name + "<br>";
	document.getElementById("node_list").innerHTML = html;



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
	if(short_path[begin_path][end_path].size==0||short_path[begin_path][end_path].size==-1)
	{
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
	}
	else
	{
		var lines = svg.selectAll(".forceLine")
        .data(edges)
        .enter()
        .append("line")
        .attr("class", "forceLine")
				   .attr("x1", function(d) { return d.source.x; })
			 	   .attr("y1", function(d) { return d.source.y; })
			 	   .attr("x2", function(d) { return d.target.x; })
			       .attr("y2", function(d) { return d.target.y; })
				   .style("stroke" ,function(d)
				   {
					let flag=0;
					let i;
					for(i=0;i<short_path[begin_path][end_path].size;i++)
					{
						if(d.source.id==short_path[begin_path][end_path].path[i]&&d.target.id==short_path[begin_path][end_path].path[i+1]) 
						  {
							  flag=1;
							  break;
						  }
						  if(d.target.id==short_path[begin_path][end_path].path[i]&&d.source.id==short_path[begin_path][end_path].path[i+1]) 
						  {
							  flag=1;
							  break;
						  }
					}
				     if(flag==1)
					   {
						   return "#e066ff";
					   }
					   else
					   {
						   return "#bdbdbd";
					   }
				})
			       .style("stroke-width" , function(d)
				   {
					  let flag=0;
					  let i;
					  for(i=0;i<short_path[begin_path][end_path].size;i++)
					  {
						  if(d.source.id==short_path[begin_path][end_path].path[i]&&d.target.id==short_path[begin_path][end_path].path[i+1]) 
						  {
							  flag=1;
							  break;
						  }
						  if(d.target.id==short_path[begin_path][end_path].path[i]&&d.source.id==short_path[begin_path][end_path].path[i+1]) 
						  {
							  flag=1;
							  break;
						  }
					  }
				     if(flag==1)
					   {
						   return "3";
					   }
					   else
					   {
						   return ".5";
					   }
				   });

	var circles = svg.selectAll(".forceCircle")
					 .data(nodes)
					 .enter()
					 .append("circle")
					 .attr("class", "forceCircle")
					 .attr("cx", function(d) { return d.x; })
				   	 .attr("cy", function(d) { return d.y; })
					 .attr("r", function(d)
					 {

						let i;
						let flag=0;
						for(i=0;i<=short_path[begin_path][end_path].size;i++)
						{
							if(d.id==short_path[begin_path][end_path].path[i]) 
							{
								flag=1;
								break;
							}
						}
					     if(flag==1)
						 {
							 return 10;
						 }
						 else
						 {
							 return 4;
						 }
					 })
					 .style("fill",function(d)
					 {

						let i;
						let flag=0;
						for(i=0;i<=short_path[begin_path][end_path].size;i++)
						{
							if(d.id==short_path[begin_path][end_path].path[i]) 
							{
								flag=1;
								break;
							}
						}
					     if(flag==1)
						 {
							 return "#cd0000";
						 }
						 else
						 {
							 return "#eeee00";
						 }
					 })
					 .style("stroke-width", ".5")
					 .style("stroke", "#8b4513")
					 .call(force.drag);
	}
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


