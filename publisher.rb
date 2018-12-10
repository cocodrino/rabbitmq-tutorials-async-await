require "rubygems"
require "bunny"
require "json"

conn = Bunny.new "amqp://tvobttnq:Ri6S8XroB9gRiIvSesqQMa2KcWI_IOkB@otter.rmq.cloudamqp.com/tvobttnq"
conn.start


ch = conn.create_channel

q=ch.queue("examplequeue", :durable=> true)
x = ch.direct("example.exchange", :durable => true)

q.bind(x, :routing_key => "process")

mesg = {:name => "tom", :mail => "asdsa@asdasd.com", :size => 10}

(1..20).each do |item|
    x.publish(JSON.generate(mesg), :timestamp=> Time.now.to_i, :routing_key=>"process")
    sleep 1
end


sleep 3.0
conn.close