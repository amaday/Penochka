@title Penochka userscript
@echo off

:main
@cls
@color 1F
@echo.
@echo               ========= Penochka (aka govno3) ��ਯ� =========
@echo               -------------------- ��� 2-ch.ru -------------------
@echo.
@echo   �롥�� ����⢨�:
@echo    f     -   ᮧ���� �ਯ� ��� Firefox, Chrome [.user.js]
@echo    o     -   ᮧ���� �ਯ� ��� Opera [.js]
@echo    q     -   ��室
@echo.
@echo.
@set /p command=^>
@if "%command%"=="q" exit
@if "%command%"=="f" set ext=.user.js & goto make
@if "%command%"=="o" set ext=.js & goto make
@cls
@echo.
@echo   �� ����� ���ࠢ����� �������.
@echo   ���஡�� �� ࠧ.
@echo.
@echo.
@ping -n 3 127.0.0.1 > nul
@goto :main

:make
@if not exist src goto errmsg
@if exist penochka%ext% del penochka%ext%
cd src
<<<<<<< HEAD:make.bat
@ type header.js css.js i18n.js base64.js jquery.min.js jquery.form.js storage.js jquery.walk.js jquery.imgboard.js settings.js main.js >> penochka%ext%
=======
@ type header.js css.js i18n.js jquery.min.js jquery.form.js jquery.imgboard.js core.js storage.js main.js modules/imagesUnfolding.js >> penochka%ext%
>>>>>>> master:make.bat
cd ..
move src\penochka%ext% penochka%ext%
@cls
@echo.
@echo   ���� �ᯥ譮 ᮧ���.
@echo.
@echo.
@ping -n 3 127.0.0.1 > nul
exit

:errmsg
@title �訡��!
@cls
@color 0C
@echo.
@echo.
@echo             �㦭� ��� ࠡ��� 䠩�� �� �������,
@echo             �஢���� ����稥 ����� src
@echo.
@ping -n 3 127.0.0.1 > nul
exit
