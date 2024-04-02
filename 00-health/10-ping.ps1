<#---
title: Ping
description: Simple ping endpoint
tag: ping
api: post
---#>
param(
    [string]$pong = "pong"
)

#
# Ping

write-host "line 1" $pong
write-host "line 2" $pong
write-host "line 3" $pong


