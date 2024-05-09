package lib

import (
	"main/my_log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func CreateQueue(conn *amqp.Connection, queueName string, args amqp.Table, exclusive bool) amqp.Queue {
	ch, _ := conn.Channel()

	if args == nil {
		args = make(map[string]interface{})
		args["x-message-ttl"] = 5000
	}

	q, err := ch.QueueDeclare(
		queueName, // name
		false,     // durable
		false,     // delete when unused
		exclusive, // exclusive
		false,     // no-wait
		args,      // arguments
	)
	my_log.FailOnError(err, "Failed to declare a queue")

	return q
}
