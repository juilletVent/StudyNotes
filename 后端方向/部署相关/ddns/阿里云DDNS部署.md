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
      - TTL=60
      - TIMEZONE=8.0
      - TYPE=A
      - CNIPV4=true
```
