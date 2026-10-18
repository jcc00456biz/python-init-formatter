@echo off
setlocal enabledelayedexpansion

echo ==================================================
echo  VS Code Extension: Build and Package
echo ==================================================
echo.

:: 1. Compile TypeScript
echo [1/2] Compiling TypeScript...
call npm run compile
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Compilation failed. Please check the errors above.
    pause
    exit /b %ERRORLEVEL%
)
echo [OK] Compilation successful!
echo.

:: 2. Package into .vsix
echo [2/2] Packaging extension (.vsix)...
call npx vsce package
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Packaging failed.
    pause
    exit /b %ERRORLEVEL%
)
echo [OK] Packaging successful!
echo.

:: 3. Clean up old .vsix files (Keep only the newly generated one)
echo [3/3] Cleaning up older .vsix files...
for /f "tokens=*" %%a in ('dir /b /o-d *.vsix 2^>nul') do (
    if not defined NEWEST_VSIX (
        set "NEWEST_VSIX=%%a"
        echo [INFO] Keeping latest package: %%a
    ) else (
        echo [INFO] Removing old package: %%a
        del /f /q "%%a"
    )
)

echo.
echo ==================================================
echo  Build and packaging completed successfully!
echo ==================================================
echo.
