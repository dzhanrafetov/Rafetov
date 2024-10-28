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
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const USER_ID = import.meta.env.VITE_USER_ID;

  // Log an error if any required environment variable is missing
  if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
    console.error("Missing EmailJS configuration:", { SERVICE_ID, TEMPLATE_ID, USER_ID });
    console.log("SERVICE_ID:", import.meta.env.VITE_SERVICE_ID);
    console.log("TEMPLATE_ID:", import.meta.env.VITE_TEMPLATE_ID);
    console.log("USER_ID:", import.meta.env.VITE_USER_ID);
    return;
  }

  try {
    return await emailjs.send(SERVICE_ID, TEMPLATE_ID, convertToRecord(formData), USER_ID);
  } catch (error) {
    console.error("Email error:", error);
  }
};

export default sendEmail;