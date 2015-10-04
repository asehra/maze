describe('MazeSolver', function() {
  it('solves the basic maze with one room', function() {
    expect(MazeSolver.solve([
      [1,1,1],
      [0,0,0],
      [1,1,1]
    ])).toEqual([
      [ 1 , 1 , 1 ],
      ['.','.','.'],
      [ 1 , 1 , 1 ]
    ]);
  });
});
