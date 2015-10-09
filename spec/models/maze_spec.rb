RSpec.describe do
  describe Maze do
    let(:width) { rand(5..10) }
    let(:height) { rand(5..10) }

    subject(:maze) { Maze.new(width: width, height: height) }

    describe '#initialize' do
      its(:width) { should eq(width) }
      its(:height) { should eq(height) }
      it { should have_a_valid_solution }
    end

    describe '#structure' do
      it 'is a 2D grid of dimensions (2*width + 1) x (2*height + 1)' do
        expect(maze.structure.length).to eq(2*maze.height + 1)
        maze.structure.each do |row|
          expect(row.length).to eq(2*maze.width + 1)
        end
      end

      it 'should show the entry and exit in the structure' do
        expect(maze.structure[1][0]).to eq(0)
        expect(maze.structure[2*height-1][2*width]).to eq(0)
      end
    end
  end
end
