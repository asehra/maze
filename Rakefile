# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec)

file 'node_modules/.bin/testem' do
  raise 'npm can not fetch dependencies' unless system 'npm install'
end
task :testem => 'node_modules/.bin/testem' do
  raise "fail" unless system "npm test"
end

task :default => [:spec, :testem]
