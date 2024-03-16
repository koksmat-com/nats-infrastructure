<#---
title: Install Helm
tag: step1
---#>

#
# Install Helm

if ((Split-Path -Leaf (Split-Path  -Parent -Path $PSScriptRoot)) -eq "sessions"){
    $path = join-path $PSScriptRoot ".." ".."
}
else{
  $path = join-path $PSScriptRoot ".." ".koksmat/"

}

$koksmatDir = Resolve-Path $path
$natsConfig = join-path $koksmatDir "nats" "helm.yml"
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm install -f $natsConfig nats nats/nats