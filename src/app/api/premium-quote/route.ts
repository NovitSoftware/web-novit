import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, validateEmailConfig } from '@/lib/email';
import { generateCommercialProposal, validateOpenAIConfig } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    // Validar configuración
    validateEmailConfig();
    validateOpenAIConfig();

    // Parsear FormData
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const projectSummary = formData.get('projectSummary') as string;
    const specialRequirements = formData.get('specialRequirements') as string;
    const pdfFile = formData.get('pdfFile') as File;

    // Validaciones básicas
    if (!email || !phone || !projectSummary || !pdfFile) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Generar propuesta con IA
    console.log('Generando propuesta comercial con IA...');
    const proposalResult = await generateCommercialProposal({
      email,
      phone,
      projectSummary,
      specialRequirements,
    });

    if (!proposalResult.success) {
      throw new Error(`Error generando propuesta: ${proposalResult.error}`);
    }

    // Convertir PDF a buffer para adjuntar
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());

    // Preparar email para el cliente
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #06b6d4 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🚀 NOVIT Software</h1>
          <p style="color: #e2e8f0; margin: 10px 0 0 0;">Propuesta Comercial Premium</p>
        </div>
        
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">¡Tu propuesta comercial está lista! ⚡</h2>
          
          <p style="color: #475569; margin-bottom: 20px;">
            Hola, hemos analizado tu proyecto con nuestra IA especializada y generado una propuesta comercial personalizada.
          </p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-bottom: 15px;">📋 Resumen de tu solicitud:</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Proyecto:</strong> ${projectSummary}</p>
            ${specialRequirements ? `<p><strong>Requerimientos especiales:</strong> ${specialRequirements}</p>` : ''}
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e293b; margin-bottom: 15px;">🤖 Propuesta Generada por IA</h3>
            <div style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${proposalResult.proposal}</div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #475569; margin-bottom: 15px;">¿Tienes preguntas sobre la propuesta?</p>
            <a href="mailto:contacto@novitsoftware.com" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">📧 Contactanos</a>
          </div>
          
          <div style="background: #fef7cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; text-align: center;">
              ⏱️ <strong>¡Respuesta en menos de 24 horas como prometido!</strong>
            </p>
          </div>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; margin: 0; font-size: 14px;">
            © 2024 NOVIT Software | La software factory que necesitás
          </p>
        </div>
      </div>
    `;

    // Enviar email al cliente con la propuesta
    const clientEmailResult = await sendEmail({
      to: email,
      subject: '⚡ Tu Propuesta Comercial Premium está lista - NOVIT Software',
      html: clientEmailHtml,
      attachments: [
        {
          filename: `requerimientos-${email.split('@')[0]}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    // Email interno para NOVIT
    const internalEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>🎯 Nueva Solicitud de Cotización Premium</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>📊 Datos del Cliente:</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Proyecto:</strong> ${projectSummary}</p>
          ${specialRequirements ? `<p><strong>Requerimientos especiales:</strong> ${specialRequirements}</p>` : ''}
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>🤖 Propuesta Generada:</h3>
          <div style="white-space: pre-wrap; font-family: monospace; font-size: 12px;">${proposalResult.proposal}</div>
        </div>
        
        <p><strong>📎 Archivo adjunto:</strong> ${pdfFile.name}</p>
        <p><strong>⏰ Enviado:</strong> ${new Date().toLocaleString('es-AR')}</p>
      </div>
    `;

    // Enviar email interno
    const internalEmailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || 'contacto@novitsoftware.com',
      subject: `🎯 Nueva Cotización Premium - ${email}`,
      html: internalEmailHtml,
      attachments: [
        {
          filename: pdfFile.name,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    // Verificar que ambos emails se enviaron
    if (!clientEmailResult.success || !internalEmailResult.success) {
      throw new Error('Error enviando emails');
    }

    return NextResponse.json({
      success: true,
      message: 'Propuesta comercial generada y enviada con éxito',
      proposal: proposalResult.proposal
    });

  } catch (error) {
    console.error('Error en /api/premium-quote:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
