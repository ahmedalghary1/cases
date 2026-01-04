# سكريبت شامل لتحديث الموقع
# 1. تغيير الاسم إلى CarbonCases_EG
# 2. تحديث الأسعار (2000-2500 جنيه)
# 3. تغيير جميع المنتجات إلى iPhone

$filesPath = "c:\Users\ELWSAM H\Desktop\project\cases"
$htmlFiles = Get-ChildItem -Path $filesPath -Filter "*.html"

$priceMapping = @{
    "270 جنيه" = "2100 جنيه"
    "285 جنيه" = "2150 جنيه"
    "300 جنيه" = "2200 جنيه"
    "345 جنيه" = "2250 جنيه"
    "360 جنيه" = "2300 جنيه"
    "390 جنيه" = "2350 جنيه"
    "420 جنيه" = "2400 جنيه"
    "450 جنيه" = "2450 جنيه"
    "480 جنيه" = "2480 جنيه"
    "510 جنيه" = "2500 جنيه"
    "540 جنيه" = "2450 جنيه"
    "595 جنيه" = "2500 جنيه"
    "600 جنيه" = "2500 جنيه"
    "970 جنيه" = "2400 جنيه"
    "1365 جنيه" = "2300 جنيه"
    "1590 جنيه" = "2450 جنيه"
    "1665 جنيه" = "2500 جنيه"
}

$phoneMapping = @{
    "Samsung S23 Ultra" = "iPhone 15 Pro Max"
    "Galaxy A54" = "iPhone 14"
    "Xiaomi Redmi Note 12" = "iPhone 13"
    "Oppo Reno 8" = "iPhone 14 Plus"
    "OnePlus 11" = "iPhone 15"
    "Xiaomi 13" = "iPhone 13 Pro"
    "Samsung S22" = "iPhone 14 Pro"
}

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # 1. تغيير الاسم
    if ($content -match "جرابات برو") {
        $content = $content -replace "جرابات برو", "CarbonCases_EG"
        $modified = $true
        Write-Host "  ✓ Updated name" -ForegroundColor Green
    }
    
    # 2. تحديث الأسعار
    foreach ($oldPrice in $priceMapping.Keys) {
        if ($content -match [regex]::Escape($oldPrice)) {
            $content = $content -replace [regex]::Escape($oldPrice), $priceMapping[$oldPrice]
            $modified = $true
        }
    }
    
    # 3. تغيير أنواع الهواتف
    foreach ($oldPhone in $phoneMapping.Keys) {
        if ($content -match [regex]::Escape($oldPhone)) {
            $content = $content -replace [regex]::Escape($oldPhone), $phoneMapping[$oldPhone]
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
        Write-Host "  ✓ File updated!" -ForegroundColor Green
    } else {
        Write-Host "  - No changes needed" -ForegroundColor Yellow
    }
}

Write-Host "`n✅ All files processed successfully!" -ForegroundColor Cyan
