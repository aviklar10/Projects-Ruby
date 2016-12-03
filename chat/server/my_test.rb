require 'mysql2'

con = Mysql2::Client.new(:host => 'localhost', :username => 'admin', :password => '1234', :database => 'chatdb')
rs = con.query('select * from message_containers')
rs.each do |row|
  puts row
end

con.close
