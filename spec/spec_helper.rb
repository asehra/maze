$LOAD_PATH.unshift "#{ __dir__ }/../app"
require "models/maze"
require 'rspec/its'
require 'byebug'

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

end

RSpec::Matchers.define :have_a_valid_solution do
  def out_of_bounds(maze, adjacent)
    !((0..maze.structure.length-1).include?(adjacent[0]) &&
      (0..maze.structure[0].length-1).include?(adjacent[1]))
  end

  def traverse(maze, start)
    traversed = [start]
    index = 0

    directions = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    while(index < traversed.length)
      current = traversed[index]

      directions.each do |direction|
        adjacent = [current[0] + direction[0], current[1] + direction[1]]
        next if out_of_bounds(maze, adjacent)

        if maze.structure[adjacent[0]][adjacent[1]] == 0
          traversed << adjacent unless traversed.include?(adjacent)
        end
      end
      index += 1
    end
    traversed
  end

  match do |maze|
    @start = [1, 0]
    @exit = [2*maze.height - 1, 2*maze.width]
    traversed_path = traverse(maze, @start)
    puts maze
    traversed_path.include? @exit
  end

  failure_message do |maze|
    "expected \n#{ maze }\n to have a valid path from #{@entry} to #{@exit}"
  end
end

