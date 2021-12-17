## TCP

- FastOpen：TCP 可通过 Cookie 缓存进行二次链接的快速打开（Linux 需要开启内核支持）
- MSS（MaxSegmentSize）：定义 TCP 封包 Payload 最大长度（不含报文头）
- RTT：报文往返所需时长
- RTO：等待 ACK 报文超时重传的超时时长（应略大于 RTT，且是动态的）
- 滑动窗口：发送窗口/接收窗口
- 延迟 ACK
- 拥塞控制
  - 以丢包作为依据控制：CUBIC 算法（RFC8312 [Linux2.6.19]）
  - 以探测带宽作为依据：BBR Linux4.9
  - 慢启动 cwnd
  - 快速重传（RFC2581）

## TLS

- DH 秘钥交换协议
- ECC 椭圆曲线
- ECDH 密钥交换
- TLS1.3 0RTT
- 量子通讯与 BB84 协议
