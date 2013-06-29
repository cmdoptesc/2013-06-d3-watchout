var board = {
  width: 780,
  height: 580
};

var gameData = {
  numEnemies: 30,
  highScore: 0,
  score: 0
};


var arena = d3.select("#arenaOfDeath")
  .append("svg:svg")
    .attr("width", board.width)
    .attr("height", board.height);

var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag", dragmove);

function dragmove(d) {
  d3.select(this)
      .attr("cx", d3.event.x)
      .attr("cy", d3.event.y);
}

var makeEnemy = function(x, y) {
  arena.append("svg:circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr('r', 10)
    .attr('fill', 'red');
};

var moveObject = function(x,y){
  var x = +d3.select(this).attr("cx");
  var y = +d3.select(this).attr("cy");
  x+=d3.event.dx;
  y+=d3.event.dy;
  d3.select(this).attr("cx",x);
  d3.select(this).attr('cy', y);
};

var makePlayer = function() {
  arena.append("svg:circle")
    .attr("cx", board.width/2)
    .attr("cy", board.height/2)
    .attr("r", 12)
    .attr("fill", "purple")
    .call(d3.behavior.drag()
    .on("drag", function(d) {moveObject.call(this)}));
    // .on("mouseout", function(){
    //   d3.select(this).attr("fill", "purple");
    // })
    // .on("drag", function(){
    //   console.log(d3.mouse(this));
    // });
};

for(var i=0; i<gameData.numEnemies; i++) {
  var x = Math.random()*(board.width-10);
  var y = Math.random()*(board.height-10);

  makeEnemy(x,y);
}

var circles = d3.selectAll('circle');

circles.attr('fill', 'green');

var colours = ['red','green','blue','yellow','black','orange'];


var move = function(){
  circles
    .transition()
    .duration(1500)
    .attr('cx', function(d) {
      return Math.random()*(board.width-10);
    })
    .attr('cy', function(d, i) {
      return Math.random()*(board.height-10);
    })
    .attr('fill', function(d) {
      return colours[Math.floor(Math.random()*6)];
    });
};


makePlayer();
setInterval(move, 2000);

// console.log(d3.mouse(arena));