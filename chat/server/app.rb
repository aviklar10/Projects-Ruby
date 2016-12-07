#!/usr/bin/ruby

require 'sinatra'
require 'sinatra/base'
# require 'sinatra/json'
require 'rack'
require 'json'
require '../server/dbModel'
# application root
MAX_CLIENTS = 50


class App < Sinatra::Base
  post '/fetchlastmsg' do
    mc = Message_container.new
    puts mc.get_msg_from(@params[:id])
    json_response = mc.get_msg_from(@params[:id]).to_json
    return(json_response)
  end

  clients = Array[]

  get('/') do
    client_id = Random.rand(MAX_CLIENTS)
    while clients.include? client_id do
      client_id = Random.rand(MAX_CLIENTS)
    end
    clients.push(client_id)
    mc = Message_container.new
    lastid = mc.get_last_id
    json_response = {myId: client_id, lastId: lastid}.to_json
    return(json_response)
  end

  post('/:id/sendmsg') do
    error = false
    begin
      mc = Message_container.new
      json_response = mc.push_msg('user_%s'%@params[:id], @params[:mymsg])
    rescue
      error = true
    end

    return {data: error}.to_json
  end


# render a create restaurant form
  get('/restaurants/create') do
    erb(:create_restaurant)
  end

  post('/:id/send') do
    mc = Message_container.new
    json_response = mc.push_msg('user_%s'%@params[:id], @params[:msg])
    return json_response
  end


end


Rack::Handler::WEBrick.run App