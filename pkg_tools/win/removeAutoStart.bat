@echo off
cd /d %~dp0
reg delete hklm\software\microsoft\windows\currentversion\run /v MixIO
pause