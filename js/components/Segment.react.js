var Segment = React.createClass({

  propTypes: {
    segments: ReactPropTypes.object.isRequired,
  },

  render: function() {
   
    var d3_json =
    '"name": "flare", "children": [ { "name": "vis", "children": [ { "name": "operator", "children": [ {"name": "PURCHASE", "size": 29100}, {"name": "VIEWCONTENT", "size": 103800}, {"name": "VISITS", "size": 183400} ] }, {"name": "NEW USER", "size": 14000000} ] } ] }'; 
    var margin = {top: 40, right: 10, bottom: 10, left: 10},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var color = d3.scale.category20c();

    var treemap = d3.layout.treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.size; });

    var div = d3.select("body").append("div")
      .style("position", "relative")
      .style("width", (width + margin.left + margin.right) + "px")
      .style("height", (height + margin.top + margin.bottom) + "px")
      .style("left", margin.left + "px")
      .style("top", margin.top + "px");

    var node = div.datum(JSON.parse(d3_json)).selectAll(".node")
      .data(treemap.nodes)
      .enter().append("div")
      .attr("class", "node")
      .call(this.position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .text(function(d) { return d.children ? null : d.name; });


    d3.selectAll("input").on("change", function change() {
      var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };
      node
        .data(treemap.value(value).nodes)
        .transition()
        .duration(1500)
        .call(this.position);
    });
    return (
      <style>
	body {
	  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	  margin: auto;
	  position: relative;
	  width: 960px;
	}

	form {
	  position: absolute;
	  right: 10px;
	  top: 10px;
	}

	.node {
	  border: solid 1px white;
	  font: 10px sans-serif;
	  line-height: 12px;
	  overflow: hidden;
	  position: absolute;
	  text-indent: 2px;
	}
	</style>
        <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <script src="http://www.parsecdn.com/js/parse-latest.js"></script>
	<form>
	  <label><input type="radio" name="mode" value="size" checked> Size</label>
	  <label><input type="radio" name="mode" value="count"> Count</label>
	</form>
    );
  }

  function position() {
    this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
  }

})
