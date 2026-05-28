# =========================================================
# EX EXPERIENCE OS — CINEMATIC GRID FIX
# =========================================================

Clear-Host

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "      FIXING CINEMATIC GRID"
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# =========================================================
# ENTER PROJECT
# =========================================================

if (Test-Path ".\ex-experience-os") {
    cd .\ex-experience-os
}

# =========================================================
# ENSURE DIRECTORY
# =========================================================

mkdir components\system -Force | Out-Null

# =========================================================
# REBUILD CINEMATIC GRID
# =========================================================

@'
'use client';

export default function CinematicGrid() {

  return (

    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            )
          `,

          backgroundSize: '80px 80px',
        }}
      />

    </div>

  );
}
'@ | Set-Content components\system\cinematic-grid.tsx

# =========================================================
# CLEAR NEXT CACHE
# =========================================================

if (Test-Path ".next") {

    Write-Host ""
    Write-Host "CLEARING NEXT CACHE..." -ForegroundColor Yellow

    Remove-Item .next -Recurse -Force
}

# =========================================================
# RESTART SERVER
# =========================================================

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "      CINEMATIC GRID FIXED"
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

npm run dev
