

require 'rubygems'
require 'dm-core'
require 'dm-migrations'
DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, 'mysql://localhost/test')

class MessageContainer
  include DataMapper::Resource
  property :id,   Serial
  property :message, String, :required => true
end


DataMapper.auto_migrate!

#Create a new record
MessageContainer.create(:message => 'msg1')

#Fetching a record using DM
MessageContainer.first(:message => 'msg1')

#Destroying a record
author = MessageContainer.get(7)
author.destroy