<#---
title: Superset Ingress
tag: superset-ingress
api: post
---

#>


$dnsname = "nats.home.nexi-intra.com"

$config = @"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nats
spec:
  rules:
  - host: $dnsname
    
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nats
            port:
              number: 8088
"@

write-host "Applying config" -ForegroundColor Green

write-host $config -ForegroundColor Gray

$config |  kubectl apply -f -