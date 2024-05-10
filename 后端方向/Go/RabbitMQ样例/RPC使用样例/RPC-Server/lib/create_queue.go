package lib

import (
	"main/my_log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func CreateQueue(conn *amqp.Connection, queueName string, args amqp.Table) amqp.Queue {
	ch, _ := conn.Channel()

	if args == nil {
		args = make(map[string]interface{})
		args["x-message-ttl"] = 3600000
	}

	q, err := ch.QueueDeclare(
		queueName, // name
		false,     // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		args,      // arguments
	)
	my_log.FailOnError(err, "队列创建失败，请检查RabbitMQ服务是否正常运行。")

	return q
}

func ConsumeQueue(conn *amqp.Connection, queueName string) (*amqp.Channel, <-chan amqp.Delivery) {
	ch, _ := conn.Channel()

	msgs, err := ch.Consume(
		queueName, // queue
		"",        // consumer
		false,     // auto-ack
		false,     // exclusive
		false,     // no-local
		false,     // no-wait
		nil,       // args
	)
	my_log.FailOnError(err, "队列消费失败，请检查RabbitMQ服务是否正常运行。")

	return ch, msgs
}
