# تحديث اللوجو في Footer لجميع الصفحات

$files = Get-ChildItem -Path "c:\Users\ELWSAM H\Desktop\project\cases" -Filter "*.html"

$oldFooterLogo1 = '                        <img src="images/logo.jpg" alt="جرابات برو" style="height: 40px; margin-left: 10px;">'
$newFooterLogo1 = '                        <img src="images/logo.png" alt="CarbonCases_EG" style="height: 35px; margin-left: 5px; vertical-align: middle;">'

$oldFooterLogo2 = '                        <img src="images/logo.png" alt="جرابات برو" style="height: 40px; margin-left: 10px;">'
$newFooterLogo2 = '                        <img src="images/logo.png" alt="CarbonCases_EG" style="height: 35px; margin-left: 5px; vertical-align: middle;">'

# تغيير النص أيضاً
$oldText = "جرابات برو"
$newText = "CarbonCases_EG"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # تحديث اللوجو في Footer
    if ($content -match [regex]::Escape($oldFooterLogo1)) {
        $content = $content -replace [regex]::Escape($oldFooterLogo1), $newFooterLogo1
        $modified = $true
        Write-Host "$($file.Name): Updated footer logo (.jpg)" -ForegroundColor Green
    }
    
    if ($content -match [regex]::Escape($oldFooterLogo2)) {
        $content = $content -replace [regex]::Escape($oldFooterLogo2), $newFooterLogo2
        $modified = $true
        Write-Host "$($file.Name): Updated footer logo (.png)" -ForegroundColor Green
    }
    
    # تحديث النصوص في Footer (بعد اللوجو)
    if ($content -match "logo\.png.*$oldText") {
        # استبدال النص بعد اللوجو
        $pattern = "(logo\.png[^>]*>[\r\n\s]*)" + [regex]::Escape($oldText)
        $replacement = '${1}' + $newText
        $content = $content -replace $pattern, $replacement
        $modified = $true
        Write-Host "$($file.Name): Updated footer text" -ForegroundColor Cyan
    }
    
    if ($modified) {
        Set-Content $file.FullName $content -Encoding UTF8 -NoNewline
        Write-Host "$($file.Name): Saved!" -ForegroundColor Yellow
    }
}

Write-Host "`nDone!" -ForegroundColor Green
