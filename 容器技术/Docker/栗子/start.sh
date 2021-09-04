#!/bin/bash

docker run \
-itd \
-p 10080:80 \
-p 10443:443 \
-p 13306:3306 \
-v ~/.acme.sh:/root/.acme.sh \
--name xray-runtime xray
