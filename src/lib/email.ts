import nodemailer from 'nodemailer';

// Configuración del transporte de email con Gmail - lazy initialization to avoid build-time errors
let emailTransporterInstance: nodemailer.Transporter | null = null;

const getEmailTransporter = () => {
  if (!emailTransporterInstance && process.env.GMAIL_USER && process.env.GMAIL_PASSWORD) {
    emailTransporterInstance = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD, // App Password de Gmail
      },
    });
  }
  return emailTransporterInstance;
};

// Función para enviar email
export const sendEmail = async ({
  to,
  subject,
  html,
  attachments = []
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}) => {
  try {
    const emailTransporter = getEmailTransporter();
    if (!emailTransporter) {
      throw new Error('Email transporter not configured. Please set GMAIL_USER and GMAIL_PASSWORD environment variables.');
    }

    const mailOptions = {
      from: `"NOVIT Software" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    };

    const result = await emailTransporter.sendMail(mailOptions);
    console.log('Email enviado:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

// Función para validar configuración de email
export const validateEmailConfig = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    throw new Error('Gmail credentials not configured. Check GMAIL_USER and GMAIL_PASSWORD in .env.local');
  }
};
