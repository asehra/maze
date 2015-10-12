(function(window) {
  class MazeSolver {
    constructor(maze) {
      this.originalMaze = maze;

      let start = [1,0],
      end = [maze.length - 2, maze[0].length - 1];

      this.solvedMaze = this.plotRoute(start, end);
    }

    drawSolution() {
      return MazeSolver.draw(this.solvedMaze);
    }

    drawOriginal() {
      return MazeSolver.draw(this.originalMaze);
    }

    plotRoute(start, end) {
      let route = new Route(start).find(this.originalMaze, end);
      let maze = clone(this.originalMaze);
      let current = route;
      while(current) {
        maze[current.location[0]][current.location[1]] = '*';
        current = current.previous
      }
      return maze;
    }

    static draw(maze) {
      let output = [];
      for(let row of maze) {
        output.push(row.join('').replace(/0/g, ' ').replace(/1/g, '▓'));
      }

      return output.join('\n');
    }
  }
  window.MazeSolver = MazeSolver;


  var clone = function(maze) {
    let other = [];
    for(let row of maze) other.push(row.slice());

    return other;
  }

  const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

  class Route {
    constructor(location, previous) {
      this.previous = previous;
      this.location = location;
    }

    isAt(location) {
      return JSON.stringify(this.location) === JSON.stringify(location);
    }

    isPreviousAt(location) {
      return this.previous && this.previous.isAt(location);
    }

    neighbouringLocation(direction) {
      return [this.location[0] + direction[0],
          this.location[1] + direction[1]];
    }

    find(maze, end) {
      if(this.isAt(end)) return this;
      let found = false;

      for(let direction of DIRECTIONS) {
        let location = this.neighbouringLocation(direction);
        if(this.isPreviousAt(location)) { continue; }

        if(maze[location[0]][location[1]] === 0) {
          found = found || new Route(location, this).find(maze, end);
        }
      }

      return found;
    }
  }
})(window);
