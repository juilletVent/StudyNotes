package main

import (
	"main/lib"
	"main/my_log"
	"main/utils"
	"math/rand"
	"strconv"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:3F7E81UTJGEKyhRBiLR1Jn2k9RNu40nH@192.168.6.115:5672")
	my_log.FailOnError(err, "无法连接至RabbitMQ消息队列，请检查网络连接或者RabbitMQ服务是否正常运行，并放行5672端口")
	defer conn.Close()

	// 创建独占队列
	resultQueue, ch := lib.CreateQueue(conn, "", true, nil)
	defer ch.Close()

	// 设置随机数种子
	rand.Seed(time.Now().UTC().UnixNano())

	for i := 0; i < 100; i++ {
		n := utils.RandInt(1, 40)
		my_log.Info("Requesting %d fib", n)
		result, err := fibRPC(conn, resultQueue, n)
		my_log.FailOnError(err, "调用RPC服务失败")
		my_log.Info("Fibonacci(%d) is %d", n, result)

		time.Sleep(1 * time.Second)
	}

}

func fibRPC(conn *amqp.Connection, resultQueue amqp.Queue, n int) (res int, err error) {
	// 消费队列
	ch, msgs := lib.ConsumeQueue(conn, resultQueue.Name)
	defer ch.Close()

	// 投递RPC请求
	requestId := utils.RandomString(32)
	err = ch.Publish(
		"",
		"rpc_queue",
		false,
		false,
		amqp.Publishing{
			ContentType:   "text/plain",
			CorrelationId: requestId,
			ReplyTo:       resultQueue.Name,
			Body:          []byte(strconv.Itoa(n)),
		},
	)
	my_log.FailOnError(err, "RPC消息投递失败")

	result := 0

	for msg := range msgs {
		if msg.CorrelationId == requestId {
			res, err = strconv.Atoi(string(msg.Body))
			my_log.FailOnError(err, "Failed to convert body to integer")

			result = res
			break
		}
	}

	return result, err
}
