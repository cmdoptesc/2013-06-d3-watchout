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

// var scoreBoard = arena.append('rect')
//     .attr('x', board.width-80)
//     .attr('y', 20)
//     .attr('width', 70)
//     .attr('height', 80)
//     .attr('fill', 'blue')
//       .append('p')
//         .attr('width', 30)
//         .attr('height', 30)
//         .attr('fill', 'green')
//         .append('text')
//           .text('hey')
//             .attr('x', board.width - 80)
//             .attr('y', 20);


// var scoreDisplay = arena.append('svg:rect')
//   .attr('x', board.width - 80)
//   .attr('y', 30)
//   .attr('width', 80)
//   .attr('height', 30)
//   .attr('opacity',0.10);

var scoreText = arena.append('text')
     .text(gameData.score)
     .attr('x', board.width - 85)
     .attr('y', 30);

gameData.addScore = function(){
  scoreBoard.data(gameData.score)
  .text('hey');
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
  console.log(x);
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
      .on("drag", function(d) {moveObject.call(this);}));
};


var animate = function() {
    d3.select(this).transition()
        .duration(1000)
        .attr("r", 10)
      .transition()
        .delay(1000)
        .attr("r", 40);
};

for(var i=0; i<gameData.numEnemies; i++) {
  var x = Math.random()*(board.width-10);
  var y = Math.random()*(board.height-10);

  makeEnemy(x,y);
}

var circles = d3.selectAll('circle');


var moveEnemies = function(){
  circles
    .transition()
    .duration(1500)
    .attr('cx', function(d) {
      return Math.random()*(board.width-10);
    })
    .attr('cy', function(d, i) {
      return Math.random()*(board.height-10);
    });
};


makePlayer();
setInterval(moveEnemies, 2000);

// console.log(d3.mouse(arena));