cls
@echo off
title Franky Bot
:Q
cls
color 9
echo Do you want to start? (Y/N)
set/p "cho=>"
if %cho%==Y goto CONNECT
if %cho%==y goto CONNECT
if %cho%==n goto END
if %cho%==N goto END
goto INVALIDCHOICE
 
:INVALIDCHOICE
cls
color C
echo Invalid choice.
timeout /t 3
goto Q
 
:END
cls
color C
echo Closing...
timeout /t 5
exit
 
:CONNECT
cls
color 9
echo Connecting to Discord API...
node .