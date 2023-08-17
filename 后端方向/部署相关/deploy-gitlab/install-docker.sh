#!/bin/bash

apt-get remove docker docker-engine docker.io containerd runc

apt-get update -y

apt-get install apt-transport-https ca-certificates curl software-properties-common gnupg2 -y

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

apt-get update -y

apt-get install docker-ce docker-ce-cli containerd.io -y

systemctl start docker

systemctl enable docker

apt-get install docker-compose -y

docker -v

docker-compose -v
