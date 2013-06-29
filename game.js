var board = {
  width: 780,
  height: 580
};

var gameData = {
  numEnemies: 30,
  highScore: 0,
  score: 0
};


var arena = d3.select("#arenaOfDeath").
  append("svg:svg").
  attr("width", board.width).
  attr("height", board.height).
  attr('fill', '#ccc');

var makeEnemy = function(x, y) {
  arena.append("svg:circle").
  attr("cx", x).
  attr("cy", y).
  attr('r', 10).
  attr('fill', 'red');
};

for(var i=0; i<gameData.numEnemies; i++) {
  var x = Math.random()*(board.width-10);
  var y = Math.random()*(board.height-10);

  makeEnemy(x,y);
}