#!/usr/bin/ruby

require '../server/dbModel'
require 'sinatra'
require 'sinatra/base'
# require 'sinatra/json'
require 'rack'
require 'json'
# application root
MAX_CLIENTS = 50
# set :bind, '127.0.0.1'
# set :port, 4567
# set :views, settings.root + '/public'

class App < Sinatra::Base
  get '/fetchprev' do
    mc = Message_container.new
    puts mc.get_msg_from(@params[:id])
    json_response = mc.get_msg_from(@params[:id]).to_json
    puts json_response.class
    return(json_response)

# mc.push_msg('yossi', 'msg5')
#     container = MessageContainer.new
#     container.message = "second msg"
#     # container.attributes = {  :message => container.message }
#     container.date = "02:11:57"
#     # container.message= "second msg"
#     container.save
#     # json_response = {container: container}
#     # return(json_response)
#     "suceeded"
  end
  clients = Array[]
  get('/') do
    print 'hi'
    client_id = Random.rand(MAX_CLIENTS)
    print client_id
    while clients.include? client_id do
      client_id = Random.rand(MAX_CLIENTS)
      print client_id
    end
    clients.push(client_id)
    print clients
    json_response = {container: client_id}
    # 'hello client %s'%client_id
    return(json_response)
  end
  get('/:id/send/:msg') do
    mc = Message_container.new
    json_response = mc.push_msg('user_%s'%@params[:id], @params[:msg])
    # mc.push_msg('client_%s'%@params[:id], 'bla bla')
    # json_response = %{you: #{@params[:msg]}}
    return json_response
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

# render the restaurant of concern to the browser
  get('/restaurants/:id/edit') do
    restaurant = Restaurant.get(params[:id])
    render(:edit_restaurant, locals: {restaurant: restaurant})
  end

# render the order of concern to the browser
  get('/orders/:id/edit') do
    order = Order.get(params[:id])
    erb(:edit_order, locals: {order: order})
  end


# asyncronous endpoints

  get('/api/restaurants') do
    restaurants = Restaurant.all
    json_response = {restaurants: restaurants}.to_json
    return(json_response)
  end

  get('/api/restaurants/:id/orders') do
    restaurant = Restaurant.get(params[:id])
    json_response = {orders: restaurant.orders}.to_json
    return(json_response)
  end


  post('/restaurants') do
    new_restaurant = Restaurant.new
    new_restaurant.name = params[:name]
    new_restaurant.location = params[:location]
    new_restaurant.save
    redirect('/')
  end

# create a new order
  post('/orders') do
    new_order = Order.new
    new_order.description = params[:description]
    new_order.restaurant_id = params[:restaurant_id]
    new_order.save
    redirect('/')
  end

  post('/api/restaurants') do
    restaurant = Restaurant.new
    restaurant.name = params[:name]
    restaurant.location = params[:location]
    restaurant.save
    json_response = {restaurant: restaurant}.to_json
    return(json_response)
  end

  post('/api/orders') do
    new_order = Order.new
    new_order.description = params[:description]
    new_order.restaurant_id = params[:restaurant_id]
    new_order.save
    json_response = {order: new_order}.to_json
    return(json_response)
  end
end


Rack::Handler::WEBrick.run App