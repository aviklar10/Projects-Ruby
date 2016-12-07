#!/usr/bin/ruby
# This file is used by Rack-based servers to start the application.
require 'json'
require 'bundler'
require 'bundler/setup'
Bundler.require
use Rack::Session::Cookie, secret: 'dev_secret'
# require ::File.expand_path('../app',  __FILE__)
require './app'
run App

