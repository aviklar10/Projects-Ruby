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
  def push_msg(user, msg)
    Message_container.create(:message => msg, :user_name=>user)
    return %{#{user}: #{msg}}
  end
  def get_msg_from(prev_id)
    res = Message_container.where('id > %s'%prev_id).unscope(:order).all
    hash = Hash.new
    res.each do |r|
      hash[r.id] = %{#{r.user_name}: #{r.message}}
    end
    return hash
  end
  def get_last_id()
    return Message_container.maximum('id')
  end

end

# mc = Message_container.new
# print mc.get_last_id
# puts mc.get_msg_from(2)
# mc.push_msg('yossi', 'msg5')
# Message_container.create(:message => 'msg2', :user_name=>'dani')
# Message_container.create(:message => 'msg3', :user_name=>'moti')
