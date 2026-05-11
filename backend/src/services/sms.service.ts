import axios from 'axios';
export const sendSMS = async (phone: string, message: string) => {
  // Replace with Africa's Talking / Twilio SDK in production
  console.log(`📱 SMS to ${phone}: ${message}`);
  return { success: true };
};