class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    @maze = Maze.new(width: width, height: height)
  end

  private

  def width
    [(!params[:width].blank? ? params[:width].to_i : 10), 30].min
  end

  def height
    [(!params[:height].blank? ? params[:height].to_i : 10), 30].min
  end
end
