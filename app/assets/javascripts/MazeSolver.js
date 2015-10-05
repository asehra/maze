(function(window) {
  var tree = []
  var Node = function(location, parent) {
    this.parent = parent;
    this.location = location;
    tree.push(this);
  }

  Node.prototype.isParent = function(location) {
    return this.parent && arrayEquals(this.parent.location, location);
  }

  var arrayEquals = function(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };

  var directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  var neighbourNode, output;

  var locate = function(maze, start, end) {
    if(arrayEquals(start.location, end)) return start;
    var i = 0;
    for(i=0; i<directions.length; i++) {
      var neighbour = [start.location[0] + directions[i][0],
        start.location[1] + directions[i][1]];
      if(!start.isParent(neighbour)) {
        if(maze[neighbour[0]][neighbour[1]] === 0) {
          neighbourNode = new Node(neighbour, start);
          output = locate(maze, neighbourNode, end);
          if(output !== -1) {
            return output;
          }
        }
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
      var i, j, row,
      root = new Node([1,0]),
      end = [maze.length - 2, maze[0].length - 1];

      var endNode = locate(maze, root, end);

      plotPath(maze, endNode);
      var output = [];
      for(i = 0; i<maze.length; i++) {
        row = maze[i];

        output[i] = row.join('').replace(/0/g, ' ').replace(/1/g, '▓');
      }

      return output.join('\n');
    }
  }


  window.MazeSolver = MazeSolver;
})(window)
