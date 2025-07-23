<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [配置转发、过滤规则](#%E9%85%8D%E7%BD%AE%E8%BD%AC%E5%8F%91%E8%BF%87%E6%BB%A4%E8%A7%84%E5%88%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
