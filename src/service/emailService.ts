import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const convertToRecord = (data: FormData): Record<string, unknown> => ({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  phone: data.phone,
  service: data.service,
  message: data.message,
});

const sendEmail = async (formData: FormData): Promise<EmailJSResponseStatus | void> => {
  const SERVICE_ID = import.meta.env.SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.TEMPLATE_ID;
  const USER_ID = import.meta.env.USER_ID;

  if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
    console.error("Missing EmailJS configuration.");
    return;
  }

  try {
    return await emailjs.send(SERVICE_ID, TEMPLATE_ID, convertToRecord(formData), USER_ID);
  } catch (error) {
    console.error("Email error:", error);
  }
};

export default sendEmail;