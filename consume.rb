require "rubygems"
require "bunny"
require "json"

conn = Bunny.new "amqp://tvobttnq:Ri6S8XroB9gRiIvSesqQMa2KcWI_IOkB@otter.rmq.cloudamqp.com/tvobttnq"
conn.start

ch = conn.create_channel
q = ch.queue("examplequeue",:durable=>true)

def pdf_processing(json_information)
    puts "handling pdf"
    #puts json_information_message['email']
    sleep 5.0
    puts "pdf processing done"
end

begin
    puts ' [*] Esperando mensaje'
    q.subscribe(:block=> true) do |deliver,prop,payload|
        json_message = JSON.parse(payload)
        pdf_processing(json_message)
    end
rescue Interrupt => _
    conn.close
    exit(0)
end


