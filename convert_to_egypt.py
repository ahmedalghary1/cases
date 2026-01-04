#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
سكريبت لتحويل موقع متجر جرابات الهواتف من السوق السعودي إلى السوق المصري
"""

import re
import os
from pathlib import Path

# المجلد الذي يحتوي على الملفات
PROJECT_DIR = Path(__file__).parent

# قائمة التحويلات
REPLACEMENTS = {
    # العملة
    ' ريال': ' جنيه',
    'ريال ': 'جنيه ',
    'الريال السعودي': 'الجنيه المصري',
    
    # المدن
    'الرياض': 'القاهرة',
    'جدة': 'الإسكندرية',
    'الدمام': 'المنصورة',
    'مكة المكرمة': 'الجيزة',
    'المدينة المنورة': 'طنطا',
    'الخبر': 'بورسعيد',
    'تبوك': 'أسيوط',
    'حي الملقا': 'مدينة نصر',
    
    # البلد
    'المملكة العربية السعودية': 'جمهورية مصر العربية',
    'المملكة': 'مصر',
    'محاكم المملكة': 'المحاكم المصرية',
    
    # أرقام الهواتف
    '+966 50 123 4567': '+20 100 123 4567',
    '+966 11 234 5678': '+20 2 1234 5678',
    '+966 5X XXX XXXX': '+20 10X XXX XXXX',
    
    # النطاق
    'phonecase.sa': 'phonecase.eg',
    
    # تفاصيل الشحن
    'لجميع أنحاء المملكة': 'لجميع أنحاء الجمهورية',
    'مناطق المملكة': 'مناطق مصر',
    'داخل الرياض': 'داخل القاهرة',
}

# تحويلات الأسعار (ريال → جنيه)
PRICE_CONVERSIONS = {
    '25': '75',      # رسوم الشحن
    '89': '270',
    '95': '285',
    '99': '300',
    '115': '345',
    '119': '360',
    '129': '390',
    '139': '420',
    '149': '450',
    '159': '480',
    '169': '510',
    '179': '540',
    '198': '595',
    '199': '600',
    '320': '970',
    '450': '1365',
    '500': '1500',
    '525': '1590',
    '550': '1665',
}

def convert_prices(content):
    """تحويل الأسعار من ريال إلى جنيه"""
    for sar, egp in PRICE_CONVERSIONS.items():
        # نمط للبحث عن السعر متبوعاً بكلمة ريال
        patterns = [
            (f'{sar} ريال', f'{egp} جنيه'),
            (f'{sar}&nbsp;ريال', f'{egp}&nbsp;جنيه'),
            (f'>{sar}<', f'>{egp}<'),
        ]
        for old, new in patterns:
            content = content.replace(old, new)
    
    return content

def process_file(filepath):
    """معالجة ملف واحد"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # تطبيق التحويلات النصية
        for old, new in REPLACEMENTS.items():
            content = content.replace(old, new)
        
        # تحويل الأسعار
        content = convert_prices(content)
        
        # حفظ الملف إذا تغير
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'✓ تم تحديث: {filepath.name}')
            return True
        else:
            print(f'- لا توجد تغييرات: {filepath.name}')
            return False
            
    except Exception as e:
        print(f'✗ خطأ في معالجة {filepath.name}: {str(e)}')
        return False

def main():
    """الدالة الرئيسية"""
    print('=' * 60)
    print('تحويل الموقع من السوق السعودي إلى السوق المصري')
    print('=' * 60)
    print()
    
    # قائمة الملفات للمعالجة
    files_to_process = [
        'products.html',
        'product-details.html',
        'cart.html',
        'checkout.html',
        'wishlist.html',
        'my-account.html',
        'order-tracking.html',
        'contact.html',
        'about.html',
        'faq.html',
        'terms.html',
        'privacy-policy.html',
        'register.html',
    ]
    
    updated_count = 0
    for filename in files_to_process:
        filepath = PROJECT_DIR / filename
        if filepath.exists():
            if process_file(filepath):
                updated_count += 1
        else:
            print(f'! الملف غير موجود: {filename}')
    
    print()
    print('=' * 60)
    print(f'اكتمل التحويل! تم تحديث {updated_count} ملف.')
    print('=' * 60)

if __name__ == '__main__':
    main()
