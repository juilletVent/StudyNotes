```shell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```
