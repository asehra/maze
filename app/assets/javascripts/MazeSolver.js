(function(window) {
  var MazeSolver = {
    solve: function(maze) {
      var i, j, row, cell;
      for(i = 0; i<maze.length; i++) {
        row = maze[i];

        for(j=0; j<row.length; j++) {
           cell = row[j];
           if(cell === 0) row[j] = '.';
        }
      }

      return maze;
    }
  }


  window.MazeSolver = MazeSolver;
})(window)
