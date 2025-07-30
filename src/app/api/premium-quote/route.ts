import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import nodemailer from 'nodemailer';

export const dynamic = 'force-static';

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    // Check all required environment variables
    const missingVars = [];
    if (!process.env.OPENAI_API_KEY) missingVars.push('OPENAI_API_KEY');
    if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
    if (!process.env.SMTP_PASSWORD) missingVars.push('SMTP_PASSWORD');
    
    if (missingVars.length > 0) {
      return NextResponse.json(
        { 
          error: `Configuración incompleta. Variables faltantes: ${missingVars.join(', ')}`,
          help: 'Ver CONFIGURACION.md para instrucciones de configuración'
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const formData = await request.formData();
    
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const projectSummary = formData.get('projectSummary') as string;
    const specialRequirements = formData.get('specialRequirements') as string;
    const pdfFile = formData.get('pdfFile') as File;

    // Validate required fields
    if (!email || !phone || !projectSummary || !pdfFile) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validate corporate email
    const blockedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (blockedDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: 'Debe usar un email corporativo' },
        { status: 400 }
      );
    }

    // Convert PDF to text (simplified - in production you'd use a proper PDF parser)
    const pdfBuffer = await pdfFile.arrayBuffer();
    const pdfText = `[PDF Content: ${pdfFile.name} - ${pdfBuffer.byteLength} bytes]`;

    // Generate AI proposal using OpenAI
    const prompt = `
Como experto en desarrollo de software y consultoría IT de NOVIT Software, genera una propuesta comercial profesional basada en:

INFORMACIÓN DEL CLIENTE:
- Email: ${email}
- Teléfono/WhatsApp: ${phone}

DESCRIPCIÓN DEL PROYECTO:
${projectSummary}

REQUERIMIENTOS ESPECIALES:
${specialRequirements || 'No se especificaron requerimientos especiales'}

ARCHIVO ADJUNTO:
${pdfText}

INSTRUCCIONES:
1. Crea una propuesta comercial completa y profesional
2. Incluye secciones: Resumen Ejecutivo, Alcance del Proyecto, Metodología, Cronograma Estimado, Tecnologías Propuestas, Equipo de Trabajo, Inversión Estimada
3. Mantén el tono profesional y técnico de NOVIT Software
4. Incluye beneficios específicos para el cliente
5. Propón tecnologías modernas y mejores prácticas
6. Estima tiempos realistas de desarrollo
7. Formato: usa markdown para estructura clara

CONTEXTO DE NOVIT SOFTWARE:
- Software factory especializada en desarrollo web, móvil, IA, y consultoría IT
- Enfoque en transformación digital empresarial
- Metodologías ágiles y tecnologías de vanguardia
- Experiencia en proyectos empresariales complejos

Genera la propuesta completa:
`;

    let aiProposal;
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Eres un consultor senior de NOVIT Software, especializado en generar propuestas comerciales técnicas profesionales para proyectos de desarrollo de software.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });

      aiProposal = completion.choices[0]?.message?.content || 'Error generando propuesta';
    } catch (openaiError: any) {
      console.error('Error with OpenAI:', openaiError);
      return NextResponse.json(
        { 
          error: 'Error con OpenAI. Verifica tu API key y créditos disponibles',
          details: 'Ver CONFIGURACION.md para configurar OpenAI correctamente'
        },
        { status: 500 }
      );
    }

    // Create HTML email content
    const emailHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #0A0089 0%, #FF0080 50%, #00FFE1 100%); padding: 20px; text-align: center; color: white; }
            .content { padding: 20px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #0A0089; }
            .proposal { background: #f8f9fa; padding: 20px; border-left: 4px solid #0A0089; margin: 20px 0; }
            pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🤖 Nueva Cotización Premium Generada por IA</h1>
            <p>NOVIT Software - Validación Manual Requerida</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>📋 Datos del Cliente</h2>
              <p><span class="label">Email:</span> ${email}</p>
              <p><span class="label">Teléfono/WhatsApp:</span> ${phone}</p>
            </div>
            
            <div class="section">
              <h2>📝 Resumen del Proyecto</h2>
              <p>${projectSummary}</p>
            </div>
            
            <div class="section">
              <h2>📋 Requerimientos Especiales</h2>
              <p>${specialRequirements || 'No se especificaron requerimientos especiales'}</p>
            </div>
            
            <div class="section">
              <h2>📄 Archivo Adjunto</h2>
              <p><span class="label">Nombre:</span> ${pdfFile.name}</p>
              <p><span class="label">Tamaño:</span> ${(pdfBuffer.byteLength / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            
            <div class="proposal">
              <h2>🤖 Propuesta Generada por IA</h2>
              <pre>${aiProposal}</pre>
            </div>
            
            <div class="section">
              <p><strong>⚠️ IMPORTANTE:</strong> Esta propuesta fue generada automáticamente por IA y requiere validación manual antes de ser enviada al cliente.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to Rodrigo Vazquez
    try {
      const transporter = createTransporter();
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: 'rodrigo.vazquez@novit.com.ar',
        subject: `🤖 Nueva Cotización Premium IA - ${email}`,
        html: emailHtml,
        attachments: [
          {
            filename: pdfFile.name,
            content: Buffer.from(pdfBuffer),
            contentType: 'application/pdf',
          },
        ],
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { 
          error: 'Error enviando email. Verifica configuración SMTP en .env.local',
          details: 'Ver CONFIGURACION.md para configurar el email correctamente'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Cotización premium generada y enviada para validación',
    });

  } catch (error) {
    console.error('Error processing premium quote:', error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}