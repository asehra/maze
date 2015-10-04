RSpec.describe do
  describe Maze do
    let(:width) { rand(5..10) }
    let(:height) { rand(5..10) }

    subject(:maze) { Maze.new(width: width, height: height) }

    describe '#initialize' do
      its(:width) { should eq(width) }
      its(:height) { should eq(height) }

      it 'sets entry in first column on valid odd numbered row next to a room' do
        expect(maze.entry[:row]).to be_odd
        expect(maze.entry[:row]).to be_between(0, maze.height * 2 - 1)
        expect(maze.entry[:col]).to eq(0)
      end

      it 'sets exit in last column on valid odd numbered row next to a room' do
        expect(maze.exit[:row]).to be_odd
        expect(maze.exit[:row]).to be_between(0, maze.height * 2 - 1)
        expect(maze.exit[:col]).to eq(2 * maze.width)
      end
    end

    describe '#structure' do
      it 'is a 2D grid of dimensions (2*width + 1) x (2*height + 1)' do
        expect(maze.structure.length).to eq(2*maze.height + 1)
        maze.structure.each do |row|
          expect(row.length).to eq(2*maze.width + 1)
        end
      end

      it 'has height*width "rooms" denoted by 0s at every [odd,odd] coordinate' do
        maze.structure.each_with_index do |row, y|
          next if y.even?
          row.each_with_index do |value, x|
            next if x.even?
            expect(value).to eq(0)
          end
        end
      end

      it 'should show the entry and exit in the structure' do
        expect(maze.structure[maze.entry[:row]][maze.entry[:col]]).to eq(0)
        expect(maze.structure[maze.exit[:row]][maze.exit[:col]]).to eq(0)
      end
    end

    context 'validity' do
      it { should have_a_valid_solution }
    end
  end
end
