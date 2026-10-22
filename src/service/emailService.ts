import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

/**
 * Шаблонът в EmailJS не чете `name` — във всички досегашни имейли „Name:“ и темата „New Contact
 * Request from“ идват празни. Пращаме името и под имената, които шаблоните на EmailJS ползват.
 */
const convertToRecord = (data: FormData): Record<string, unknown> => ({
  name: data.name,
  from_name: data.name,
  user_name: data.name,
  reply_to: data.email,
  email: data.email,
  phone: data.phone,
  service: data.service,
  message: data.message,
});

const sendEmail = async (formData: FormData): Promise<EmailJSResponseStatus> => {
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const USER_ID = import.meta.env.VITE_USER_ID;

  // Хвърляме, а не логваме: иначе формулярът показва „изпратено“ при незаписано запитване.
  if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
    console.error("Missing EmailJS configuration:", {
      SERVICE_ID: !!SERVICE_ID,
      TEMPLATE_ID: !!TEMPLATE_ID,
      USER_ID: !!USER_ID,
    });
    throw new Error("Missing EmailJS configuration");
  }

  try {
    return await emailjs.send(SERVICE_ID, TEMPLATE_ID, convertToRecord(formData), USER_ID);
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

export default sendEmail;
