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

var makeEnemy = function(x, y) {
  arena.append("svg:circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr('r', 10)
    .attr('fill', 'red');
};

for(var i=0; i<gameData.numEnemies; i++) {
  var x = Math.random()*(board.width-10);
  var y = Math.random()*(board.height-10);

  makeEnemy(x,y);
}

var circles = d3.selectAll('circle');

circles.attr('fill', 'green');




var move = function(){
  circles
    .transition()
    .duration(2000)
    .attr('cx', function(d) {
      return Math.random()*(board.width-10);
    })
    .attr('cy', function(d, i) {
      return Math.random()*(board.height-10);
    });
};