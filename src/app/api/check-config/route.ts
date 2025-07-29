import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const checks = {
    openai: !!process.env.OPENAI_API_KEY,
    smtp_user: !!process.env.SMTP_USER,
    smtp_password: !!process.env.SMTP_PASSWORD,
    smtp_host: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtp_port: process.env.SMTP_PORT || '587'
  };

  const allConfigured = checks.openai && checks.smtp_user && checks.smtp_password;

  return NextResponse.json({
    configured: allConfigured,
    checks,
    message: allConfigured 
      ? '✅ Configuración completa - La funcionalidad debería funcionar correctamente'
      : '❌ Configuración incompleta - Ver CONFIGURACION.md para completar la configuración',
    missing: Object.entries(checks)
      .filter(([key, value]) => !value && key !== 'smtp_host' && key !== 'smtp_port')
      .map(([key]) => key)
  });
}