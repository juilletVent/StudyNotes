#!/bin/bash

# -t 对build出来的image打上名称与版本标记，格式为："命令:版本"
docker build -t xray:latest .
