import OpenAI from 'openai';

// Configuración de OpenAI
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Función para generar propuesta comercial con IA
export const generateCommercialProposal = async ({
  email,
  phone,
  projectSummary,
  specialRequirements,
}: {
  email: string;
  phone: string;
  projectSummary: string;
  specialRequirements?: string;
}) => {
  try {
    const prompt = `
Como experto en desarrollo de software y consultoría tecnológica de NOVIT Software, genera una propuesta comercial premium personalizada basada en:

INFORMACIÓN DEL CLIENTE:
- Email: ${email}
- Teléfono: ${phone}
- Resumen del proyecto: ${projectSummary}
- Requerimientos especiales: ${specialRequirements || 'Ninguno especificado'}

SERVICIOS DE NOVIT:
- Desarrollo de Software (Web, Mobile, APIs)
- Inteligencia Artificial (ML, NLP, Computer Vision)
- Consultoría IT (Auditoría, Arquitectura, Transformación Digital)
- QA & Testing (Automatizado, Manual, Performance)
- UX/UI Design (Research, Prototyping, Testing)
- Data Science (Analytics, Dashboards, Big Data)

INSTRUCCIONES:
1. Analiza el proyecto y recomienda los servicios más adecuados
2. Incluye una estructura de proyecto con fases
3. Estima tiempos y recursos necesarios
4. Propone tecnologías específicas
5. Incluye garantías y soporte post-productivo
6. Mantén un tono profesional pero cercano
7. Personaliza según el sector de la empresa (deducir del email)

FORMATO:
- Resumen ejecutivo
- Análisis de requerimientos
- Solución propuesta
- Metodología y fases
- Tecnologías recomendadas
- Equipo asignado
- Cronograma estimado
- Inversión y condiciones
- Próximos pasos

Máximo 1500 palabras, enfocado en valor y resultados.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Eres un consultor senior de NOVIT Software, experto en generar propuestas comerciales técnicas personalizadas y de alto valor."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    return {
      success: true,
      proposal: completion.choices[0]?.message?.content || 'No se pudo generar la propuesta'
    };
  } catch (error) {
    console.error('Error generando propuesta con OpenAI:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

// Función para validar configuración de OpenAI
export const validateOpenAIConfig = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured. Check OPENAI_API_KEY in .env.local');
  }
};
