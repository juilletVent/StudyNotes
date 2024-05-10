package lib

import (
	"main/my_log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func CreateExchange(conn *amqp.Connection, exchangeName string) {
	checkCh, _ := conn.Channel()
	ch, err := conn.Channel()
	my_log.FailOnError(err, "Failed to open a channel")
	defer ch.Close()

	if err = checkCh.ExchangeDeclarePassive(
		exchangeName, // name
		"topic",      // type
		true,         // durable
		false,        // auto-deleted
		false,        // internal
		false,        // no-wait
		nil,          // arguments
	); err != nil {
		// 创建Exchange
		err := ch.ExchangeDeclare(
			exchangeName, // name
			"topic",      // type
			true,         // durable
			false,        // auto-deleted
			false,        // internal
			false,        // no-wait
			nil,          // arguments
		)
		my_log.FailOnError(err, "创建Exchange失败")
	} else {
		checkCh.Close()
	}
}
