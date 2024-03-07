# 本地部署 Ollama

### 部署 Ollama

```shell
curl https://ollama.ai/install.sh | sh
ollama run gemma:2b
# 高贵的用户，可以运行全功能版本
# ollama run gemma:7b
```

### 启动 WEB UI

docker-compose 启动文件：

```yaml
version: "3.8"

services:
  chatbot-ollama:
    image: ghcr.io/ivanfioravanti/chatbot-ollama:main
    network_mode: host
    extra_hosts:
      - "host.docker.internal:127.0.0.1"
```

直接使用 docker-compose 启动：

```bash
docker-compose up -d
```
