package main

import (
	"main/lib"
	"main/my_log"
	"strconv"

	amqp "github.com/rabbitmq/amqp091-go"
)

func fib(n int) int {
	if n == 0 {
		return 0
	} else if n == 1 {
		return 1
	} else {
		return fib(n-1) + fib(n-2)
	}
}

func main() {
	// 建立连接
	conn, err := amqp.Dial("amqp://admin:3F7E81UTJGEKyhRBiLR1Jn2k9RNu40nH@192.168.6.115:5672")
	my_log.FailOnError(err, "无法连接至RabbitMQ消息队列，请检查网络连接或者RabbitMQ服务是否正常运行，并放行5672端口")

	// 创建RPC队列
	rpcQueue := lib.CreateQueue(conn, "rpc_queue", nil)

	// 消费队列
	ch, msgs := lib.ConsumeQueue(conn, rpcQueue.Name)
	defer ch.Close()

	go runServer(ch, msgs)

	my_log.Info("RPC Server started, waiting for messages.")
	select {}
}

func runServer(ch *amqp.Channel, msgs <-chan amqp.Delivery) {
	for msg := range msgs {
		n, err := strconv.Atoi(string(msg.Body))
		my_log.FailOnError(err, "无法将消息转换为整数，请检查消息内容是否为整数。")

		my_log.Info("[RPC] %s(%s):%d -> rpc_queue\n", msg.ReplyTo, msg.CorrelationId, n)

		response := fib(n)

		err = ch.Publish(
			"", msg.ReplyTo,
			false,
			false,
			amqp.Publishing{
				ContentType:   "text/plain",
				CorrelationId: msg.CorrelationId,
				Body:          []byte(strconv.Itoa(response)),
			})
		my_log.FailOnError(err, "无法发送RPC响应，请检查RabbitMQ服务是否正常运行。")

		msg.Ack(false)
		my_log.Info("[RPC] rpc_queue -> %s(%s):%d\n", msg.ReplyTo, msg.CorrelationId, response)
	}
}
