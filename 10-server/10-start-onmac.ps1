<#---
tag: start
api: post
---#>

$info = nats server check connection --format=json | ConvertFrom-Json

if ($info.status -eq "OK") {
    Write-Host "Nats server is already running"
    exit
}

if ((Split-Path -Leaf (Split-Path  -Parent -Path $PSScriptRoot)) -eq "sessions") {
    Set-Location "$PSScriptRoot/../../nats/"
    
}
else {
    Set-Location "$PSScriptRoot/../.koksmat/nats/"
   
}
#/opt/homebrew/opt/nats-server/bin/nats-server  -js  -c dev.conf

/opt/homebrew/opt/nats-server/bin/nats-server   -c dev.conf -js