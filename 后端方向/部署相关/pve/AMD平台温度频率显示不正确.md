关于 AMD CPU，频率显示不正确，以及温度不显示的问题，可以使用下面的方法修正

## 已验证平台

- CPU: AMD 6900HX OS: PVE 8.4.13

## 备份文件

修改前请备份原始文件：

```bash
cp /usr/bin/s.sh /usr/bin/s.sh.backup
cp /usr/share/pve-manager/js/pvemanagerlib.js /usr/share/pve-manager/js/pvemanagerlib.js.backup
```

## 修改 `/usr/bin/s.sh` 修正 CPU 频率显示不正确的问题

```bash
#!/bin/bash

# 方案1：获取所有核心频率的平均值
curC=`cat /proc/cpuinfo | grep "cpu MHz" | awk '{sum+=$4; count++} END {if(count>0) printf "%.2f", sum/count; else print "0"}'`

# 方案2：或者使用 cpufreq（更准确，但需要检查是否存在）
if [ -d "/sys/devices/system/cpu/cpu0/cpufreq" ]; then
    # 使用 cpufreq 获取当前频率（所有在线CPU的平均值）
    curC_alt=`grep "" /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq 2>/dev/null | awk -F: '{sum+=$2; count++} END {if(count>0) printf "%.2f", sum/count/1000; else print "0"}'`
    # 如果 cpufreq 可用，优先使用它
    if [ -n "$curC_alt" ] && [ "$curC_alt" != "0" ]; then
        curC=$curC_alt
    fi
fi

# 获取最大频率
max=`cat /proc/cpuinfo | grep "cpu MHz" | awk -F ":" '{print $2}' | sed 's/[^0-9.]//g' | sort -nr | head -1`

# 获取最小频率
minC=`lscpu | grep 'CPU min MHz' | awk '{print $4}'`

# 获取温度信息
r=`sensors 2>/dev/null | grep -E 'Tctl|edge|Core|Package' | grep '^[a-zA-Z0-9].[[:print:]]*:.*[0-9].*°C' -o | sed 's/:\ */:/g' | sed 's/:/":"/g' | sed 's/^/"/g' | sed 's/$/",/g' | sed 's/\ °C\ /°C/g' | sed 's/\ //g' | awk 'BEGIN{ORS=""}{print $0}' | sed 's/\,$//g' | sed 's/°C/\&degC/g'`

# 设置默认最大频率
if [ -n "$max" ]; then
    maxC=`echo "$max" | bc -l`
else
    maxC="3300"
fi

# 构建频率信息
c="\"CPU-MHz\":\""$curC"\",\"CPU-max-MHz\":\""$maxC"\",\"CPU-min-MHz\":\""$minC"\""

# 构建最终输出
if [ -n "$r" ]; then
    r="{"$r","$c"}"
else
    r="{"$c"}"
fi

echo $r
```

## 修改 `/usr/share/pve-manager/js/pvemanagerlib.js` 修正无温度显示的问题

在该文件中检索：`CPU实时` 定位到待修改的位置，大概内容像这样：

```
{
    itemId: "MHz",
    colspan: 2,
    printBar: false,
    title: gettext("CPU频率"),
    textField: "tdata",
    renderer: function (value) {
      var d = JSON.parse(value);
      f0 = d["CPU-MHz"];
      f1 = d["CPU-min-MHz"];
      f2 = d["CPU-max-MHz"];
      return `CPU实时(Cur): ${f0} MHz | 最小(min): ${f1} MHz | 最大(max): ${f2} MHz `;
    },
  }
```

在该项之后添加额外的温度定义，修改完毕后应该长这个样子：

```js
{
      itemId: "MHz",
      colspan: 2,
      printBar: false,
      title: gettext("CPU频率"),
      textField: "tdata",
      renderer: function (value) {
        var d = JSON.parse(value);
        f0 = d["CPU-MHz"];
        f1 = d["CPU-min-MHz"];
        f2 = d["CPU-max-MHz"];
        return `CPU实时(Cur): ${f0} MHz | 最小(min): ${f1} MHz | 最大(max): ${f2} MHz `;
      },
    },
    // 下面是我们添加的项
    {
      itemId: "Temperature",
      colspan: 2,
      printBar: false,
      title: gettext("CPU温度"),
      textField: "tdata",
      renderer: function (value) {
        var d = JSON.parse(value);
        var temp_info = [];
        if (d["Tctl"]) temp_info.push(`CPU: ${d["Tctl"]}`);
        if (d["edge"]) temp_info.push(`GPU: ${d["edge"]}`);
        return temp_info.join(" | ");
      },
    },
```

_Tips：建议将该文件下载下来使用 IDE 修改，避免出错_

修改完毕后重启 PVE 代理服务：`systemctl restart pveproxy`

## 效果

<img width="943" height="319" alt="Image" src="https://github.com/user-attachments/assets/584b7ecb-f352-4610-8df7-e2c4a404ee56" />
