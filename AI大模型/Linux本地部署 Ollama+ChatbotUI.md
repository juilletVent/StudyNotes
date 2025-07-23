<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [本地部署 Ollama](#%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2-ollama)
    - [部署 Ollama](#%E9%83%A8%E7%BD%B2-ollama)
    - [启动 WEB UI](#%E5%90%AF%E5%8A%A8-web-ui)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
