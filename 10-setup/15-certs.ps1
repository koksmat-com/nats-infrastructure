<#---
title: Dev Certificates
description: Install development certificates
---

## Guide
https://docs.nats.io/running-a-nats-service/configuration/securing_nats/tls#creating-self-signed-certificates-for-testing

#>
if ($env:WORKDIR -eq $null) {
    $env:WORKDIR = join-path $psscriptroot ".." ".koksmat" "workdir"
}
$workdir = $env:WORKDIR

if (-not (Test-Path $workdir)) {
    $x = New-Item -Path $workdir -ItemType Directory 
}

$workdir = Resolve-Path $workdir
$natsdir = join-path $workdir "nats"

Push-Location
Set-Location $natsdir
# mkcert -install
mkcert -cert-file server-cert.pem -key-file server-key.pem localhost ::1 0.0.0.0 127.0.0.1
# nats-server --tls --tlscert=server-cert.pem --tlskey=server-key.pem -ms 8222  -c dev.conf -js
Pop-Location