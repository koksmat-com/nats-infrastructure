curl -L https://raw.githubusercontent.com/nats-io/nsc/master/install.py | python3
<#
```bash
nsc nsc init
? enter a configuration directory /Users/nielsgregersjohansen/.local/share/nats/nsc/stores
? Select an operator Create Operator
? name your operator, account and user naughty_feistel
[ OK ] created operator naughty_feistel
[ OK ] created system_account: name:SYS id:ADPRCJHEZ4SMRQGNHZAONXPQZPEX2ZYJ3FJ6HCGB4OXVU5YFAYVDG6QR
[ OK ] created system account user: name:sys id:UC6QVJ3EV7GP56FSYKF7PCWAW6ZIBRHVXW667UW4J54KJET2P57V3VQ2
[ OK ] system account user creds file stored in `~/.local/share/nats/nsc/keys/creds/naughty_feistel/SYS/sys.creds`
[ OK ] created account naughty_feistel
[ OK ] created user "naughty_feistel"
[ OK ] project jwt files created in `~/.local/share/nats/nsc/stores`
[ OK ] user creds file stored in `~/.local/share/nats/nsc/keys/creds/naughty_feistel/naughty_feistel/naughty_feistel.creds`
> to run a local server using this configuration, enter:
>   nsc generate config --mem-resolver --config-file <path/server.conf>
> then start a nats-server using the generated config:
>   nats-server -c <path/server.conf>
all jobs succeeded
```
#>