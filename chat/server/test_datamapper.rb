require 'rubygems'
require 'dm-timestamps'
require 'data_mapper'
require 'active_record'

# require  'dm-migrations'

$MYSQL_USER='admin'
$MYSQL_PASS='1234'
# DataMapper.setup(:default,  'mysql://%s:%s@localhost/chatdb'%[$MYSQL_USER, $MYSQL_PASS])
DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, "mysql://admin:1234@localhost/chatdb")

class MessageContainer
  include DataMapper::Resource
  property :id, Serial, :key => true
  property :client_id, Integer, required: true
  property :date, DateTime, required: true
  property :message, String, required: true
  self.raise_on_save_failure = true

end

DataMapper.finalize

DataMapper.auto_upgrade!
# DataMapper.auto_upgrade!('/chatdb')

container = MessageContainer.new
container.message = "second msg"
# container.attributes = {  :message => container.message }
# container.date = "02:11:57"
container.client_id = 2
container.message = "second msg"
container.save