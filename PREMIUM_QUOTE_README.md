# Premium AI Quote Feature - Setup Instructions

## Overview
This feature adds an AI-powered automatic quotation system to the Novit Software website that allows users to submit requirements and receive AI-generated commercial proposals.

## New Components Added

### 1. Premium Quote Button
- Added prominently in the Hero section as the main call-to-action
- Gradient styling with ⚡ lightning bolt emoji for premium branding
- Opens the premium quote modal when clicked

### 2. PremiumQuoteModal Component
Located: `src/components/ui/PremiumQuoteModal.tsx`

**Features:**
- ✅ Corporate email validation (blocks Gmail, Outlook, etc.)
- ✅ Phone/WhatsApp field for contact
- ✅ Project summary textarea
- ✅ PDF file upload (max 10MB, PDF only)
- ✅ Real-time form validation
- ✅ Beautiful gradient header with Novit branding
- ✅ Loading states during submission

### 3. API Route
Located: `src/app/api/premium-quote/route.ts`

**Features:**
- ✅ OpenAI GPT-4 integration for proposal generation
- ✅ Email service with nodemailer
- ✅ PDF file handling
- ✅ Corporate email validation
- ✅ Professional HTML email template
- ✅ Sends to rodrigo.vazquez@novit.com.ar for manual validation

## Environment Variables Required

Create a `.env.local` file with:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install openai nodemailer @types/nodemailer
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your OpenAI API key
   - Configure SMTP credentials

3. **Build and Run**
   ```bash
   npm run build
   npm run dev
   ```

## How It Works

1. **User Flow:**
   - User clicks "⚡ Cotización Premium en 24hs" button
   - Fills out the form with corporate email, phone, project summary, and PDF
   - System validates inputs (especially corporate email domain)
   - Form submits to `/api/premium-quote`

2. **AI Processing:**
   - OpenAI GPT-4 processes the project summary and PDF metadata
   - Generates a professional commercial proposal with Novit branding
   - Includes sections: Executive Summary, Project Scope, Methodology, Timeline, Technologies, Team, Investment

3. **Email Delivery:**
   - System sends HTML email to rodrigo.vazquez@novit.com.ar
   - Includes all user data, original PDF attachment, and AI-generated proposal
   - Email formatted with Novit brand colors and professional styling

4. **Manual Validation:**
   - Rodrigo can review the AI-generated proposal
   - Make any necessary adjustments before sending to client
   - Ensures quality control while leveraging AI efficiency

## Security Features

- ✅ Corporate email domain validation
- ✅ File type validation (PDF only)
- ✅ File size limits (10MB max)
- ✅ Form input sanitization
- ✅ Server-side validation

## Email Template

The system generates a professional HTML email with:
- Novit gradient header
- Client data summary
- Project description
- AI-generated proposal
- Original PDF attachment
- Clear validation instructions

## Future Enhancements

Potential improvements:
- PDF text extraction for better AI analysis
- Custom proposal templates by industry
- Client notification system
- Proposal tracking dashboard
- Multi-language support