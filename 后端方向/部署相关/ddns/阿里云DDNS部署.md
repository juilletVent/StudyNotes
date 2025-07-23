<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [docker-compose 一把梭](#docker-compose-%E4%B8%80%E6%8A%8A%E6%A2%AD)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## docker-compose 一把梭

无需多言，直接上代码

```yaml
version: "3.8"

services:
  aliyun-ddns:
    image: sanjusss/aliyun-ddns
    container_name: aliyun-ddns
    restart: always
    network_mode: host
    environment:
      - AKID=[AccessKey ID]
      - AKSCT=[AccessKey Secret]
      - DOMAIN=[your domain]
      - REDO=30
      - TTL=600
      - TIMEZONE=8.0
      - TYPE=A
      - CNIPV4=true
```
