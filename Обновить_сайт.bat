@echo off
chcp 65001 >nul
echo const outfitData = { top: [], bot: [] }; > data.js

echo outfitData.top = [ >> data.js
for /f "delims=" %%i in ('dir /b /a-d "top\*.png" "top\*.jpg" "top\*.jpeg" "top\*.webp" 2^>nul') do echo "%%i", >> data.js
echo ]; >> data.js

echo outfitData.bot = [ >> data.js
for /f "delims=" %%i in ('dir /b /a-d "bot\*.png" "bot\*.jpg" "bot\*.jpeg" "bot\*.webp" 2^>nul') do echo "%%i", >> data.js
echo ]; >> data.js

start index.html
