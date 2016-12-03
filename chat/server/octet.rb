Octet = Rack::Builder.new do
  use Rack::Reloader, 0
  use Rack::ContentLength
  app = proc do |env|
    [ 200, {'Content-Type' => 'text/plain'}, ["b"] ]
  end
  run app
end.to_app