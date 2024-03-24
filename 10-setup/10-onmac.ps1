<#---
title: Setup NATS on Mac
---
https://docs.nats.io/nats-concepts/what-is-nats/walkthrough_setup


````

nats-server 2.10.9 is already installed but outdated (so it will be upgraded).
==> Downloading https://ghcr.io/v2/homebrew/core/nats-server/manifests/2.10.11
##################################################################################################################################### 100.0%
==> Fetching nats-server
==> Downloading https://ghcr.io/v2/homebrew/core/nats-server/blobs/sha256:5ece0e6c3738c119652f3deebf66c4a3865d8120f5cb05a0db1e0dfc4c354b33
##################################################################################################################################### 100.0%
==> Upgrading nats-server
  2.10.9 -> 2.10.11 

==> Pouring nats-server--2.10.11.arm64_sonoma.bottle.tar.gz
==> Caveats
To start nats-server now and restart at login:
  brew services start nats-server
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/nats-server/bin/nats-server
==> Summary
🍺  /opt/homebrew/Cellar/nats-server/2.10.11: 8 files, 12.3MB
==> Running `brew cleanup nats-server`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
Removing: /opt/homebrew/Cellar/nats-server/2.10.9... (8 files, 12.9MB)
```

#>

brew install nats-server
brew tap nats-io/nats-tools
brew install nats-io/nats-tools/nats
brew install mkcert