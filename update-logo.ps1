$files = @(
    "about.html",
    "contact.html", 
    "faq.html",
    "login.html",
    "my-account.html",
    "order-tracking.html",
    "privacy-policy.html",
    "register.html",
    "terms.html"
)

$oldLogo = '                    <i class="bi bi-phone text-primary"></i>'
$newLogo = '                    <img src="images/logo.png" alt="جرابات برو" style="height: 40px; margin-left: 10px;">'

foreach ($file in $files) {
    $filePath = "c:\Users\ELWSAM H\Desktop\project\cases\$file"
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        if ($content -match [regex]::Escape($oldLogo)) {
            $content = $content -replace [regex]::Escape($oldLogo), $newLogo
            Set-Content $filePath $content -Encoding UTF8 -NoNewline
            Write-Host "Updated: $file" -ForegroundColor Green
        } else {
            Write-Host "Skipped (no match): $file" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Not found: $file" -ForegroundColor Red
    }
}

Write-Host "`nAll files processed!" -ForegroundColor Cyan
