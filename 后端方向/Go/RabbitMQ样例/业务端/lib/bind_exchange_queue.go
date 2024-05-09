package lib

import (
	"main/my_log"

	"github.com/rabbitmq/amqp091-go"
)

func BindExchangeQueue(conn *amqp091.Connection, exchangeName string, queueName string, routingKey string) {
	ch, _ := conn.Channel()
	err := ch.QueueBind(
		queueName,    // 队列名称
		routingKey,   // routing key
		exchangeName, // 交换机名称
		false,        // 不等待
		nil,          // 其他属性
	)
	my_log.FailOnError(err, "绑定队列失败")
}
