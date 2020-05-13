使用：${packages[@]} 返回的是一个空格拼接的元素列表，而for in配合使用的就是这个格式，所以形成以下固定写法：

    for item in ${packages[@]}; do
      echo ${item}
    done