# سكريبت لتحويل الموقع من السعودية إلى مصر
# PowerShell Script for Localization

$files = @( 
    "products.html",
    "product-details.html",
    "cart.html",
    "wishlist.html",
    "my-account.html",
    "contact.html",
    "about.html",
    "faq.html",
    "terms.html",
    "privacy-policy.html",
    "register.html",
    "order-tracking.html"
)

# التحويلات
$replacements = @{
    ' ريال' = ' جنيه'
    'ريال ' = 'جنيه '
    'الريال السعودي' = 'الجنيه المصري'
    
    # المدن
    'الرياض' = 'القاهرة'
    'جدة' = 'الإسكندرية'
    'الدمام' = 'المنصورة'
    'مكة المكرمة' = 'الجيزة'
    'المدينة المنورة' = 'طنطا'
    'الخبر' = 'بورسعيد'
    'تبوك' = 'أسيوط'
    'حي الملقا' = 'مدينة نصر'
    
    # البلد
     'المملكة العربية السعودية' = 'جمهورية مصر العربية'
    'المملكة' = 'مصر'
    'محاكم المملكة' = 'المحاكم المصرية'
    
    # أرقام
    '+966 50 123 4567' = '+20 100 123 4567'
    '+966 11 234 5678' = '+20 2 1234 5678'
    '+966 5X XXX XXXX' = '+20 10X XXX XXXX'
    
    # النطاق
    'phonecase.sa' = 'phonecase.eg'
    
    # الشحن
    'لجميع أنحاء المملكة' = 'لجميع أنحاء الجمهورية'
    'مناطق المملكة' = 'مناطق مصر'
    'داخل الرياض' = 'داخل القاهرة'
}

# تحويل الأسعار
$priceConversions = @{
    '25 ريال' = '75 جنيه'
    '89 ريال' = '270 جنيه'
    '95 ريال' = '285 جنيه'
    '99 ريال' = '300 جنيه'
    '115 ريال' = '345 جنيه'
    '119 ريال' = '360 جنيه'
    '129 ريال' = '390 جنيه'
    '139 ريال' = '420 جنيه'
    '149 ريال' = '450 جنيه'
    '159 ريال' = '480 جنيه'
    '169 ريال' = '510 جنيه'
    '179 ريال' = '540 جنيه'
    '198 ريال' = '595 جنيه'
    '199 ريال' = '600 جنيه'
    '320 ريال' = '970 جنيه'
    '450 ريال' = '1365 جنيه'
    '500 ريال' = '1500 جنيه'
    '525 ريال' = '1590 جنيه'
    '550 ريال' = '1665 جنيه'
}

$updatedCount = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "معالجة: $file" -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw -Encoding UTF8
        $originalContent = $content
        
        # تطبيق التحويلات النصية
        foreach ($key in $replacements.Keys) {
            $content = $content.Replace($key, $replacements[$key])
        }
        
        # تطبيق تحويلات الأسعار
        foreach ($key in $priceConversions.Keys) {
            $content = $content.Replace($key, $priceConversions[$key])
        }
        
        # حفظ إذا تغير
        if ($content -ne $originalContent) {
            Set-Content -Path $file -Value $content -Encoding UTF8
            Write-Host "✓ تم تحديث: $file" -ForegroundColor Green
            $updatedCount++
        } else {
            Write-Host "- لا توجد تغييرات: $file" -ForegroundColor Gray
        }
    } else {
        Write-Host "! الملف غير موجود: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "اكتمل التحويل! تم تحديث $updatedCount ملف." -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
