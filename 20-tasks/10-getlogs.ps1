<#---
title: Get Logs
tag: getlogs
output: logs.json
api: get

---

#>



if ($null -eq $env:WORKDIR ) {
    $env:WORKDIR = join-path $psscriptroot ".." ".koksmat" "workdir"
}
$workdir = $env:WORKDIR

if (-not (Test-Path $workdir)) {
    New-Item -Path $workdir -ItemType Directory | Out-Null
}

$workdir = Resolve-Path $workdir


[array]$logs = @()
$logs += @{
    title     = "Title"
    message   = "Message"
    timestamp = (Get-Date).ToString()
}


$logs  | ConvertTo-Json -Depth 10 | Out-File -FilePath (Join-Path $workdir "logs.json") -Encoding utf8NoBOM


