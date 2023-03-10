service="
[Unit]
Description=MixIO Service
After=network.target
StartLimitIntervalSec=0
 
[Service]
Type=forking
Restart=always
RestartSec=1
WorkingDirectory="$(pwd)"
ExecStart="$(pwd)"/mixio start
ExecStop="$(pwd)"/mixio stop
 
[Install]
WantedBy=multi-user.target
"
echo "${service}" > /etc/systemd/system/mixio.service