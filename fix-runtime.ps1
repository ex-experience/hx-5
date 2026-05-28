$ErrorActionPreference = "SilentlyContinue"
Clear-Host

Write-Host ""
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "   EX EXPERIENCE OS :: RUNTIME STABILIZER PATCH" -ForegroundColor White
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "» [1/4] Erasing Corrupted Dependencies & Caches..." -ForegroundColor Yellow
Remove-Item "node_modules" -Recurse -Force
Remove-Item "apps\web\node_modules" -Recurse -Force
Remove-Item "apps\web\.next" -Recurse -Force
Remove-Item "package-lock.json" -Force

Write-Host "» [2/4] Patching package.json Architecture..." -ForegroundColor Yellow
$pkgPath = ".\apps\web\package.json"
$content = Get-Content $pkgPath -Raw

# Remove conflicting reconciler and fix versions
$content = $content -replace '(?m)^\s*"react-reconciler":\s*"[^"]*",?\r?\n?', ''
$content = $content -replace '"next":\s*"[^"]*"', '"next": "14.2.15"'
$content = $content -replace '"react":\s*"[^"]*"', '"react": "^18.3.1"'
$content = $content -replace '"react-dom":\s*"[^"]*"', '"react-dom": "^18.3.1"'

Set-Content -Path $pkgPath -Value $content -Encoding UTF8
Write-Host "   [+] React 18.3.1 & Next.js 14.2.15 Locked." -ForegroundColor Green

Write-Host "`n» [3/4] Rebuilding Clean Ecosystem (This will take a minute)..." -ForegroundColor Cyan
npm install

Write-Host "`n» [4/4] Rebooting EX Experience OS..." -ForegroundColor Green
npm run dev