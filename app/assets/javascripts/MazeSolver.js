(function(window) {
  var MazeSolver = {
    solve: function(maze) {
      var start = new Node([1,0]),
      end = [maze.length - 2, maze[0].length - 1];

      var endNode = locate(maze, start, end);

      var solution = plotPath(clone(maze), endNode);
      return this.print(solution);
    },

    print: function(maze) {
      var i, output = [];
      for(i = 0; i<maze.length; i++) {
        output[i] = maze[i].join('').replace(/0/g, ' ').replace(/1/g, '▓');
      }

      return output.join('\n');
    }
  }

  window.MazeSolver = MazeSolver;

  var Node = function(location, parent) {
    this.parent = parent;
    this.location = location;
  }

  Node.prototype.isAt = function(location) {
    return JSON.stringify(this.location) === JSON.stringify(location);
  }

  Node.prototype.isDescendantOf = function(location) {
    return this.parent && this.parent.isAt(location);
  }

  Node.prototype.neighbouringLocation = function(direction) {
    return [this.location[0] + direction[0],
        this.location[1] + direction[1]];
  }

  var directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  var neighbourNode;

  var locate = function(maze, start, end) {
    if(start.isAt(end)) return start;
    var i = 0, located = false;
    for(i=0; i<directions.length; i++) {
      var neighbour = start.neighbouringLocation(directions[i]);
      if(start.isDescendantOf(neighbour)) { continue; }

      if(maze[neighbour[0]][neighbour[1]] === 0) {
        located = located || locate(maze, new Node(neighbour, start), end);
      }
    }

    return located;
  }

  var plotPath = function(maze, startNode) {
    var current = startNode;
    while(current) {
      maze[current.location[0]][current.location[1]] = '*';
      current = current.parent
    }
    return maze;
  }

  var clone = function(maze) {
    var other = [];
    for(var i = 0; i < maze.length; i++) other.push(maze[i].slice());

    return other;
  }
})(window)
