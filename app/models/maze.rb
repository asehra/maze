class Maze
  attr_reader :width, :height, :entry, :exit, :structure

  def initialize(width:, height:)
    @width = width
    @height = height
    @entry = { row: 1, col: 0 }
    @exit = { row: 2*height - 1, col: 2 * width }
    @structure = generate
  end

  def to_s
    maze = structure.map { |row| row.map { |val| val == 1 ? '@': ' '}.join }
    maze.join("\n")
  end

  private

  def generate
    grid = grid_with_rooms
    grid[entry[:row]][entry[:col]] = 0
    grid[exit[:row]][exit[:col]] = 0

    maze = [[entry[:row], entry[:col] + 1]]
    pending = neighbours_of(maze[0])

    while pending.length > 0 do
      node = pending.delete_at(rand(pending.length))
      neighbours = neighbours_of(node)
      join_point = (neighbours & maze).sample

      maze << connect(node, grid, at: join_point)
      pending = pending | (neighbours - maze)
    end
    grid
  end

  def connect(node, grid, at:)
    wall = [(node[0] + at[0])/2, (node[1] + at[1])/2]
    grid[wall[0]][wall[1]] = 0
    node
  end

  def neighbours_of(ref)
    directions = [[-2, 0], [2, 0], [0, -2], [0, 2]]
    neighbours = directions.map { |d| [ref[0] + d[0], ref[1] + d[1]] }
    neighbours.select do |room|
      (0..(2*height)).include?(room[0]) &&
        (0..(2*width)).include?(room[1])
    end
  end

  def grid_with_rooms
    (grid = empty_grid).each_with_index do |row, y|
      next if y.even?
      row.each_with_index do |value, x|
        next if x.even?
        grid[y][x] = 0
      end
    end
  end

  def empty_grid
    row = [1] * (2*width + 1)
    [].tap { |g| (2*height + 1).times { g << row.dup } }
  end
end
