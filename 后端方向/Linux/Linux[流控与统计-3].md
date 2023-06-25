## 一个功能较为完善的单网卡流控配置脚本

```shell
#!/bin/bash

IFB_NAME="ifb0"

# 定义菜单函数
function show_menu() {
    echo "==== 菜单选项 ===="
    echo "1. 添加针对某个端口的限速策略"
    echo "2. 删除针对某个端口的限速策略"
    echo "3. 清空所有已经添加的限速策略"
    echo "4. 查看当前所有的限速策略"
    echo "Q. 退出"
    echo "================="
}

# 10 转 16
decimal_to_hex() {
    decimal=$1
    hex=$(printf "%x" $decimal)
    echo $hex
}

# 16 转 10
hex_to_decimal() {
    hex=$1
    decimal=$((16#$hex))
    echo $decimal
}

# 获取当前机器默认路由对应的网卡名称
function get_default_route_interface() {
    # 获取默认路由对应的网卡名称
    interface=$(ip route | grep default | awk '{print $5}')
    echo $interface
    # echo "eth0"
}

# 检查根出站队列是否添加
function check_has_root_queue() {
    local interface="$1"
    # 检查根出站队列是否存在
    tc qdisc show dev "$interface" | grep -q "htb 1: root"
    if [ $? -ne 0 ]; then
        return 1
    fi
    return 0
}

# 检查入站队列是否添加
function check_has_ingress_queue() {
    local interface="$1"
    # 检查ens18的入站队列是否存在
    tc qdisc show dev "$interface" | grep -q "ingress"
    if [ $? -ne 0 ]; then
        return 1
    fi
    return 0
}

# 检查对应port的出站class是否已经存在
function check_has_outbound_class() {
    local interface="$1"
    local port="$2"
    local hex_port=$(decimal_to_hex $port)
    # 检查出站class是否存在
    tc class show dev $interface | grep -q "1:$hex_port"
    if [ $? -ne 0 ]; then
        return 1
    fi
    return 0
}

# 添加限速策略函数
function add_limit_strategy() {
    # 获取默认路由对应的网卡名称
    interface=$(get_default_route_interface)
    # 检查根出站队列是否存在
    check_has_root_queue "$interface"
    if [ $? -ne 0 ]; then
        # 添加默认出站队列
        read -p "请输入当前机器的总带宽（例如：100），单位Mbit: " max_rate
        # 添加出站限速策略
        tc qdisc add dev $interface root handle 1: htb default 1
        tc class add dev $interface parent 1: classid 1:1 htb rate "$max_rate"Mbit ceil "$max_rate"Mbit
    fi

    read -p "请输入目标端口号: " port
    read -p "请输入端口限速最低保证速率（例如：30）单位Mbit: " min_rate
    read -p "请输入端口限速峰值速率（例如：70）单位Mbit: " peak_rate

    hex_port=$(decimal_to_hex $port)

    # 检查对应port的出站class是否已经存在
    check_has_outbound_class $interface $port
    if [ $? -eq 0 ]; then
        # 输入 Y/N 选择是否覆盖
        read -p "当前端口已经存在限速策略，是否覆盖？[Y/N]: " choice
        if [ "$choice" != "Y" ] && [ "$choice" != "y" ]; then
            echo -e "\nError：已经存在限速策略，不覆盖，退出!\n"
            return
        fi

        # 删除filter
        local filter_id=$(tc filter list dev $interface | grep "flowid 1:${hex_port}" | awk '{print $12}')
        tc filter delete dev $interface parent 1: protocol ip prio 1 handle $filter_id u32
        filter_id=$(tc filter list dev $IFB_NAME | grep "flowid 1:${hex_port}" | awk '{print $12}')
        tc filter delete dev $IFB_NAME parent 1: protocol ip prio 1 handle $filter_id u32
    fi

    # 添加限速策略
    tc class replace dev $interface parent 1:1 classid 1:$hex_port htb rate "$min_rate"Mbit ceil "$peak_rate"Mbit

    # 检查入站队列是否存在
    check_has_ingress_queue $interface
    if [ $? -ne 0 ]; then
        modprobe ifb
        ip link set dev $IFB_NAME up
        # 开启物理网卡入站队列
        tc qdisc add dev $interface ingress
        # 物理网卡数据流转发至ifb0网卡
        tc filter replace dev $interface parent ffff: protocol ip u32 match u32 0 0 action mirred egress redirect dev ifb0
    fi

    # 检查虚拟网卡是否添加过根队列
    check_has_root_queue $IFB_NAME
    if [ $? -ne 0 ]; then
        # 为虚拟网卡添加根队列
        tc qdisc replace dev $IFB_NAME root handle 1: htb default 1
        # 为虚拟网卡添加根class（总带宽）
        tc class replace dev $IFB_NAME parent 1: classid 1:1 htb rate "$max_rate"Mbit ceil "$max_rate"Mbit
    fi

    # 为虚拟网卡添加端口入站限速策略
    tc class replace dev $IFB_NAME parent 1:1 classid 1:$hex_port htb rate "$min_rate"Mbit ceil "$peak_rate"Mbit

    # 为入站与出站添加对应的filter
    # 出站过滤器
    tc filter replace dev $interface parent 1: protocol ip prio 1 u32 match ip sport "$port" 0xffff flowid 1:$hex_port
    # 入站过滤器
    tc filter replace dev $IFB_NAME parent 1: protocol ip prio 1 u32 match ip dport "$port" 0xffff flowid 1:$hex_port

    echo -e '\nSuccess：添加限速策略成功!\n'
}

# 删除限速策略函数
function delete_limit_strategy() {
    read -p "请输入要删除的目标端口号: " port

    # 获取默认路由对应的网卡名称
    interface=$(get_default_route_interface)
    # 判断对应端口的出站class是否存在
    check_has_outbound_class $interface $port
    if [ $? -ne 0 ]; then
        echo -e "\nError：对应端口的出站class不存在，无需删除!\n"
        return
    fi

    local hex_port=$(decimal_to_hex $port)

    # 删除出站限速策略

    # 使用filter_id进行匹配的删除方式
    local filter_id=$(tc filter list dev $interface | grep "flowid 1:${hex_port}" | awk '{print $12}')
    tc filter delete dev $interface parent 1: protocol ip prio 1 handle $filter_id u32

    # 使用优先级进行匹配的删除方式
    # tc filter del dev $interface parent 1: protocol ip prio $port u32

    # 删除出站class
    tc class del dev $interface parent 1:1 classid 1:$hex_port

    # 删除入站限速策略
    # 使用filter_id进行匹配的删除方式
    filter_id=$(tc filter list dev $IFB_NAME | grep "flowid 1:${hex_port}" | awk '{print $12}')
    tc filter delete dev $IFB_NAME parent 1: protocol ip prio 1 handle $filter_id u32

    # 使用优先级进行匹配的删除方式
    # tc filter del dev $IFB_NAME parent 1: protocol ip prio $port u32

    # 删除入站class
    tc class del dev $IFB_NAME parent 1:1 classid 1:$hex_port

    echo -e "\nSuccess：删除限速策略成功\n"
}

# 清空限速策略函数
function clear_limit_strategy() {
    interface=$(get_default_route_interface)

    # 删除ens18的出站root队列
    tc qdisc del dev $interface root

    # 删除ens18的入站队列
    tc qdisc del dev $interface ingress

    # 删除ifb0网卡的根队列
    tc qdisc del dev ifb0 root

    echo -e "\nSuccess：清空限速策略成功\n"
}

function show_limit_strategy() {
    echo -e "\n当前默认网卡情况：\n"
    # 获取默认路由对应的网卡名称
    interface=$(get_default_route_interface)
    # 当前队列情况
    tc -s qdisc ls dev $interface
    # 当前class情况
    tc -s class ls dev $interface
    # 当前filter情况
    tc -s filter ls dev $interface

    echo -e "\n当前ifb网卡情况：\n"

    # 当前ifb网卡队列情况
    tc -s qdisc ls dev $IFB_NAME
    # 当前ifb网卡class情况
    tc -s class ls dev $IFB_NAME
    # 当前ifb网卡filter情况
    tc -s filter ls dev $IFB_NAME
}

# 主循环
while true; do
    show_menu # 显示菜单选项

    # 读取用户输入
    read -p "请输入菜单选项: " choice

    # 根据用户输入执行相应操作
    case $choice in
    1)
        echo "选择：添加针对某个端口的限速策略"
        add_limit_strategy
        ;;
    2)
        echo "选择：删除针对某个端口的限速策略"
        delete_limit_strategy
        ;;
    3)
        echo "选择：清空所有已经添加的限速策略"
        clear_limit_strategy
        ;;
    4)
        echo "选择：查看当前所有的限速策略"
        show_limit_strategy
        ;;
    q | Q)
        echo "退出"
        break # 退出主循环
        ;;
    *)
        echo "无效的选项，请重新输入"
        ;;
    esac

    echo # 打印一个空行进行分隔
done


# 默认匹配filter（匹配所有未命中的流量，注意prio优先级）
# tc filter add dev eth0 parent 1: protocol all prio 999 u32 match ip protocol 0 0x00 flowid 1:1

# 通过ClassID 找到 FilterID
# tc filter list dev ens18 | grep 'flowid 1:457' |awk '{print $12}'

# 通过FilterID 删除对应的Filter，prio 不能删除，必须指定优先级，对应添加时的优先级，默认1就好
# tc filter delete dev ens18 parent 1: protocol ip prio 1 handle 800::801 u32
```
