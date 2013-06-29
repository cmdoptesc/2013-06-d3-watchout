var board = {
  width: 780,
  height: 580
};

var gameData = {
  numEnemies: 20,
  highScore: 0,
  score: 0
};

var arena = d3.select("#arenaOfDeath")
  .append("svg:svg")
    .attr("width", board.width)
    .attr("height", board.height);

var scoreText = d3.select('#current')
     .text(gameData.score);

var highScoreText = d3.select('#high')
     .text(gameData.highScore);

gameData.addScore = function(){
  gameData.score += 1;
  scoreText.text(gameData.score);
};

var updateScore = function(){
  if(gameData.score>gameData.highScore) {
    console.log(gameData.score);
    gameData.highScore = gameData.score;
    highScoreText.text(gameData.highScore);
  }
  gameData.score = 0;
};

var playerCircle = {};

var makePlayer = function() {
  playerCircle = arena.append("svg:circle")
    .attr("cx", board.width/2)
    .attr("cy", board.height/2)
    .attr("r", 12)
    .attr("fill", "blue")
    .call(d3.behavior.drag()
      .on("drag", function(d) {moveObject.call(this);}));
};

var killAnimation = function() {
    playerCircle.transition()
        .duration(100)
        .attr("r", 25)
        .attr('fill', 'red')
      .transition()
        .delay(150)
        .attr("r", 12)
        .attr('fill', 'blue');
};

var makeEnemy = function(x, y) {
  arena.append("svg:circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr('r', 10)
    .attr('fill', 'black');
};

var moveObject = function(x,y){
  var x = +d3.select(this).attr("cx");
  var y = +d3.select(this).attr("cy");
  x+=d3.event.dx;
  y+=d3.event.dy;
  d3.select(this).attr("cx",x);
  d3.select(this).attr('cy', y);
};

var distance = function(player, enemy) {
  var dx = player.attr('cx') - enemy.attr('cx');
  var dy = player.attr('cy') - enemy.attr('cy');
  dx = dx * dx;
  dy = dy * dy;
  return Math.sqrt( dx + dy );
};

var checkCollision = function(enemy){
  if(distance(playerCircle, enemy) < 20) {
    updateScore();
    killAnimation();
  }
};

var tweenWithCollisionDetection = function(){
      var enemy = d3.select(this);
      return function(t) {
        checkCollision(enemy);
      };
};


for(var i=0; i<gameData.numEnemies; i++) {
  var x = Math.random()*(board.width-10);
  var y = Math.random()*(board.height-10);

  makeEnemy(x,y);
}

var enemies = d3.selectAll('circle');

var moveEnemies = function(){
  enemies.transition()
    .duration(3000)
    .attr('cx', function(d) {
      this.endCX = Math.random()*(board.width-10);
      return this.endCX;
    })
    .attr('cy', function(d, i) {
      this.endCY = Math.random()*(board.height-10);
      return this.endCY;
    })
    .tween('custom', tweenWithCollisionDetection);
};

makePlayer();
setInterval(gameData.addScore, 50);
setInterval(moveEnemies, 3000);

// console.log(d3.mouse(arena));