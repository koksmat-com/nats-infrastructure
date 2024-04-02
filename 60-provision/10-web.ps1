<#---
title: Web deploy to production
tag: webdeployproduction
api: post
---
We start by finding which version tag to use

eventually 

nexi-tools provision webdeployproduction 
#>

$appname = "nats-infrastructure"
$imagename = "nats-infrastructure"
$dnsname = "nats.home.nexi-intra.com"
$inputFile = join-path  $env:KITCHENROOT $imagename  ".koksmat", "koksmat.json"
$port = "4334"
$apiport = "8334"
if (!(Test-Path -Path $inputFile) ) {
  Throw "Cannot find file at expected path: $inputFile"
} 
$json = Get-Content -Path $inputFile | ConvertFrom-Json
$version = "v$($json.version.major).$($json.version.minor).$($json.version.patch).$($json.version.build)"

<#
The we build the deployment file
#>

$image = "ghcr.io/koksmat-com/$($imagename)-web:$($version)"

$config = @"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-$appname
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: default
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $appname
spec:
  selector:
    matchLabels:
      app: $appname-web
  replicas: 1
  template:
    metadata:
      labels:
        app: $appname-web
    spec: 
      containers:
      - name: $appname-web
        image: $image
        ports:
          - containerPort: $port
        env:
        - name: NATS
          value: http://nats:4222
        - name: DATAPATH
          value: /data          
        volumeMounts:
        - mountPath: /data
          name: data          
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: pvc-$appname      
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $appname
spec:
  selector:
    matchLabels:
      app: $appname-web
  replicas: 1
  template:
    metadata:
      labels:
        app: $appname-web
    spec: 
      containers:
      - name: $appname-web
        image: $image
        ports:
          - containerPort: $port
        env:
        - name: NATS
          value: http://nats:4222
        - name: DATAPATH
          value: /data          
        volumeMounts:
        - mountPath: /data
          name: data          
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: pvc-$appname      
          
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $appname
spec:
  selector:
    matchLabels:
      app: $appname-api
  replicas: 1
  template:
    metadata:
      labels:
        app: $appname-api
    spec: 
      containers:
      - name: $appname-api
        image: $image
        ports:
          - containerPort: $apiport
        env:
        - name: NATS
          value: http://nats:4222
        - name: DATAPATH
          value: /data          
        volumeMounts:
        - mountPath: /data
          name: data          
        command: ["nats-infrastructure", "snif"]
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: pvc-$appname                


"@

write-host "Applying config" -ForegroundColor Green

write-host $config -ForegroundColor Gray

$config |  kubectl apply -f -