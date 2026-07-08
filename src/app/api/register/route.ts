import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log('📝 [API Route] New Registration Received:', {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      wilaya: data.wilaya,
    });

    // رابط Google Apps Script Web App أو Webhook (يتم وضعه في ملف .env.local أو كقيمة افتراضية هنا)
    const webhookUrl =
      process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL ||
      process.env.SHEETS_WEBHOOK_URL ||
      'https://script.google.com/macros/s/AKfycbxU1n98NM51eRBlmNfz0cuIaavFE8N9EtaXpFg--BYCzSdKjIfHykGVvgk-Meswg3D0/exec';

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          console.warn('⚠️ [API Route] Google Sheets Webhook returned status:', response.status);
        } else {
          console.log('✅ [API Route] Successfully forwarded to Google Sheets!');
        }
      } catch (webhookError) {
        console.error('❌ [API Route] Error sending to Google Sheets webhook:', webhookError);
      }
    } else {
      console.log('ℹ️ [API Route] No GOOGLE_SHEETS_WEBHOOK_URL set in .env.local. Data logged locally.');
    }

    return NextResponse.json({
      success: true,
      message: 'تم إرسال طلب انضمامك بنجاح!',
    });
  } catch (error) {
    console.error('❌ [API Route] Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في معالجة البيانات على الخادم.' },
      { status: 500 }
    );
  }
}
