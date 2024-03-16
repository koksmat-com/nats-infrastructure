<#---
tag: kill
api: post
---#>

$natsPid = pgrep nats
if ($null -eq $natsPid) {
    Write-Host "Nats server is not running"
    exit
}

write-Host "Killing nats server"
$natsPid | ForEach-Object {
    kill -9 $_
}