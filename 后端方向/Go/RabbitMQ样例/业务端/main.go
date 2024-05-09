package main

import (
	"log"
	"main/lib"
	"main/my_log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func main() {
	exchangeName := "everyone-exchange"

	conn, err := amqp.Dial("amqp://admin:3F7E81UTJGEKyhRBiLR1Jn2k9RNu40nH@192.168.6.115:5672")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	// 创建交换机
	lib.CreateExchange(conn, exchangeName)
	// 创建匿名队列
	q := lib.CreateQueue(conn, "", nil, true)

	// lib.BindExchangeQueue(
	// 	conn,
	// 	exchangeName,
	// 	q.Name,
	// 	"status.#",
	// )
	lib.BindExchangeQueue(
		conn,
		exchangeName,
		q.Name,
		"status.a",
	)

	ch, _ := conn.Channel()
	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	my_log.FailOnError(err, "Failed to register a consumer")

	var forever chan struct{}

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
			time.Sleep(1 * time.Second)
			log.Printf("Done")
			d.Ack(false)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
