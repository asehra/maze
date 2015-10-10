(function(window) {
  var MazeSolver = function(maze){
    this.originalMaze = maze;

    var start = [1,0],
    end = [maze.length - 2, maze[0].length - 1];

    this.solvedMaze = this.plotRoute(start, end);
  }

  MazeSolver.prototype.drawSolution = function() {
    return MazeSolver.draw(this.solvedMaze);
  }

  MazeSolver.prototype.drawOriginal = function() {
    return MazeSolver.draw(this.originalMaze);
  }

  MazeSolver.prototype.plotRoute = function(start, end) {
    var route = new Route(start).find(this.originalMaze, end);
    var maze = clone(this.originalMaze);
    var current = route;
    while(current) {
      maze[current.location[0]][current.location[1]] = '*';
      current = current.previous
    }
    return maze;
  }

  window.MazeSolver = MazeSolver;

  MazeSolver.draw = function(maze) {
    var i, output = [];
    for(i = 0; i<maze.length; i++) {
      output[i] = maze[i].join('').replace(/0/g, ' ').replace(/1/g, '▓');
    }

    return output.join('\n');
  }

  var clone = function(maze) {
    var other = [];
    for(var i = 0; i < maze.length; i++) other.push(maze[i].slice());

    return other;
  }

  var Route = function(location, previous) {
    this.previous = previous;
    this.location = location;
  }

  Route.prototype.isAt = function(location) {
    return JSON.stringify(this.location) === JSON.stringify(location);
  }

  Route.prototype.isPreviousAt = function(location) {
    return this.previous && this.previous.isAt(location);
  }

  Route.prototype.neighbouringLocation = function(direction) {
    return [this.location[0] + direction[0],
        this.location[1] + direction[1]];
  }

  Route.prototype.find = function(maze, end) {
    if(this.isAt(end)) return this;
    var i, found = false;

    for(i=0; i<directions.length; i++) {
      var location = this.neighbouringLocation(directions[i]);
      if(this.isPreviousAt(location)) { continue; }

      if(maze[location[0]][location[1]] === 0) {
        found = found || new Route(location, this).find(maze, end);
      }
    }

    return found;
  }

  var directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
})(window)
