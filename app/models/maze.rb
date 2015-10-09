class Maze
  attr_reader :width, :height, :structure

  def initialize(width:, height:)
    @width = width
    @height = height
    @structure = empty_grid
    generate!
  end

  def to_s
    maze = structure.map { |row| row.map { |val| val == 1 ? '@': ' '}.join }
    maze.join("\n")
  end

  private

  def generate!
    connected_nodes = [[1, 1]]
    pending = neighbours_of(connected_nodes[0])

    while pending.length > 0 do
      pending_node = pending.delete_at(rand(pending.length))
      neighbours = neighbours_of(pending_node)
      random_connected_node = (neighbours & connected_nodes).sample

      connected_nodes << connect(pending_node, random_connected_node)
      pending = pending | (neighbours - connected_nodes)
    end
  end

  def connect(node, connected_node)
    wall = [(node[0] + connected_node[0])/2, (node[1] + connected_node[1])/2]
    @structure[node[0]][node[1]] = @structure[wall[0]][wall[1]] = 0
    node
  end

  def neighbours_of(node)
    directions = [[-2, 0], [2, 0], [0, -2], [0, 2]]
    neighbours = directions.map { |d| [node[0] + d[0], node[1] + d[1]] }
    neighbours.select do |room|
      (0..(2*height)).include?(room[0]) &&
        (0..(2*width)).include?(room[1])
    end
  end

  def empty_grid
    row = [1] * (2*width + 1)
    [].tap do |grid|
      (2*height + 1).times { grid << row.dup }

      grid[1][0] = grid[1][1] = 0 #entry
      grid[2*height-1][2*width] = 0 #exit
    end
  end
end
