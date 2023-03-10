@echo off
cd /d %~dp0
reg add hklm\software\microsoft\windows\currentversion\run /v MixIO /t reg_sz /d "%cd%\start.bat"
pause