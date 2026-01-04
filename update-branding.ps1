# سكريبت شامل لتحديث الاسم واللوجو في جميع الصفحات

$files = Get-ChildItem -Path "c:\Users\ELWSAM H\Desktop\project\cases" -Filter "*.html"

$replacements = @(
    # تحديث الاسم في Navbar
    @{
        Old = '<span class="brand-text">جرابات برو</span>'
        New = '<span class="brand-text">CarbonCases_EG</span>'
    },
    # تحديث alt في اللوجو
    @{
        Old = 'alt="جرابات برو"'
        New = 'alt="CarbonCases_EG"'
    },
    # تحديث النص في Footer (مع الأيقونة)
    @{
        Old = '<i class="bi bi-phone text-primary"></i>
                        جرابات برو'
        New = '<img src="images/logo.png" alt="CarbonCases_EG" style="height: 35px; margin-left: 5px; vertical-align: middle;">
                        CarbonCases_EG'
    },
    # تحديث Title
    @{
        Old = 'جرابات برو'
        New = 'CarbonCases_EG'
    },
    # تحديث Copyright
    @{
        Old = '&copy; 2024 جرابات برو'
        New = '&copy; 2024 CarbonCases_EG'
    }
)

foreach ($file in $files) {
    Write-Host "`nProcessing: $($file.Name)" -ForegroundColor Cyan
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    foreach ($replacement in $replacements) {
        if ($content -match [regex]::Escape($replacement.Old)) {
            $content = $content -replace [regex]::Escape($replacement.Old), $replacement.New
            Write-Host "  - Updated: $($replacement.Old.Substring(0, [Math]::Min(30, $replacement.Old.Length)))..." -ForegroundColor Green
        }
    }
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
        Write-Host "  ✓ SAVED" -ForegroundColor Yellow
    } else {
        Write-Host "  - No changes needed" -ForegroundColor Gray
    }
}

Write-Host "`n✅ All files processed!" -ForegroundColor Green
