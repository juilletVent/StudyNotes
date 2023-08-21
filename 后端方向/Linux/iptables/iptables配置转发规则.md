# 配置转发、过滤规则

```bash
# DNAT
iptables -t nat -A PREROUTING -p tcp --dport 31111 -j DNAT --to-destination 8.8.8.8:53 -m comment --comment "my-rules-tcp-53-dnat"
iptables -t nat -A PREROUTING -p udp --dport 31111 -j DNAT --to-destination 8.8.8.8:53 -m comment --comment "my-rules-udp-53-dnat"
# SNAT
iptables -t nat -A POSTROUTING -p tcp --dport 53 --dst 8.8.8.8 -j SNAT --to-source 172.16.10.11 -m comment --comment "my-rules-tcp-53-snat"
iptables -t nat -A POSTROUTING -p udp --dport 53 --dst 8.8.8.8 -j SNAT --to-source 172.16.10.11 -m comment --comment "my-rules-udp-53-snat"

# 配置转发过滤规则
iptables -L FORWARD -p tcp --dport 53 -j ACCEPT -m comment --comment "my-rules-tcp-3111-accept"
iptables -L FORWARD -p udp --dport 53 -j ACCEPT -m comment --comment "my-rules-udp-3111-accept"
```
