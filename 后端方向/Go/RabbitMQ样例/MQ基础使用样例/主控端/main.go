package main

import (
	"context"
	"log"
	"main/lib"
	"main/my_log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	exchangeName := "everyone-exchange"
	queueName := "everyone-queue"

	// 连接 RabbitMQ
	conn, err := amqp.Dial("amqp://admin:3F7E81UTJGEKyhRBiLR1Jn2k9RNu40nH@192.168.6.115:5672")
	my_log.FailOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	// 创建交换机
	lib.CreateExchange(conn, exchangeName)
	// 创建队列，TTL: 15s DLX: everyone-exchange.dlx
	args := make(map[string]interface{})
	args["x-message-ttl"] = 15000
	args["x-dead-letter-exchange"] = exchangeName + ".dlx"
	lib.CreateQueue(conn, queueName, args)
	// 绑定队列
	lib.BindExchangeQueue(conn, exchangeName, queueName)

	// 监听超时消息
	go monitorTimeout(conn, exchangeName)

	// 投递消息
	go senMsg(conn, exchangeName, "status.all")

	// 阻塞
	select {}
}

// 投递消息
func senMsg(conn *amqp.Connection, exchangeName string, routeKey string) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	for {
		body := "Hello World!"
		ch, _ := conn.Channel()
		err := ch.PublishWithContext(
			ctx,
			exchangeName, // exchange
			routeKey,     // routing key
			false,        // mandatory
			false,        // immediate
			amqp.Publishing{
				ContentType: "text/plain",
				Body:        []byte(body),
			})
		my_log.FailOnError(err, "Push消息失败")
		log.Printf(" [x] Sent %s\n", body)
		time.Sleep(time.Millisecond * 2000)
	}
}

func monitorTimeout(conn *amqp.Connection, exchangeName string) {
	// 创建DLX 交换机
	lib.CreateExchange(conn, exchangeName+".dlx")
	// 创建DLX 队列
	q := lib.CreateQueue(conn, exchangeName+".dlx", nil)
	// 绑定DLX 队列
	lib.BindExchangeQueue(conn, exchangeName+".dlx", q.Name)

	ch, _ := conn.Channel()
	defer ch.Close()

	// 消费死信队列
	msgs, err := ch.Consume(
		q.Name, // 队列名称
		"",     // 消费者名称
		true,   // 自动应答
		false,  // 独占
		false,  // 不等待
		false,  // no-local
		nil,    // 其他属性
	)

	if err != nil {
		my_log.FailOnError(err, "消费死信队列失败")
		return
	}

	for msg := range msgs {
		log.Printf("[x] Timeout a message: %s\n", msg.Body)
	}
}
