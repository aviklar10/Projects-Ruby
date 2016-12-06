require 'rubygems'
require 'active_record'
ActiveRecord::Base.establish_connection(
    :adapter=> "mysql2",
    :username=> "admin",
    :password=> "1234",
    :host => "localhost",
    :database=> "chatdb"
)

class Message_container < ActiveRecord::Base
  self.table_name = "message_container"
end

Message_container.create(:message => 'msg1', :user_name => 'avi')
# Message_container.create(:message => 'msg2')
# Message_container.create(:message => 'msg3')

participant = Message_container.find(1)
puts %{#{participant.message} stays in #{participant.id}}

Message_container.find(1).destroy