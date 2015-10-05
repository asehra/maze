(function(window) {
  var arrayEquals = function(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  var Node = function(location, parent) {
    this.parent = parent;
    this.location = location;
  }

  Node.prototype.isDescendantOf = function(location) {
    return this.parent && arrayEquals(this.parent.location, location);
  }

  Node.prototype.neighbouringLocation = function(direction) {
    return [this.location[0] + direction[0],
        this.location[1] + direction[1]];
  }

  var directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  var neighbourNode, output;

  var locate = function(maze, start, end) {
    if(arrayEquals(start.location, end)) return start;
    var i = 0;
    for(i=0; i<directions.length; i++) {
      var neighbour = start.neighbouringLocation(directions[i]);
      if(start.isDescendantOf(neighbour)) { continue; }

      if(maze[neighbour[0]][neighbour[1]] === 0) {
        output = locate(maze, new Node(neighbour, start), end);
        if(output !== -1) { return output; }
      }
    }

    return -1;
  }

  var plotPath = function(maze, startNode) {
    var current = startNode;
    while(current) {
      maze[current.location[0]][current.location[1]] = '*';
      current = current.parent
    }
  }

  var MazeSolver = {
    solve: function(maze) {
      var root = new Node([1,0]),
      end = [maze.length - 2, maze[0].length - 1];

      var endNode = locate(maze, root, end);

      plotPath(maze, endNode);
      return this.print(maze);
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
})(window)
