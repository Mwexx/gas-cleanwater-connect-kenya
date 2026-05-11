import axios from 'axios';
const BASE = 'https://sandbox.safaricom.co.ke';
export const getMpesaToken = async () => {
  const res = await axios.get(`${BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    auth: { username: process.env.MPESA_CONSUMER_KEY!, password: process.env.MPESA_CONSUMER_SECRET! }
  });
  return res.data.access_token;
};
export const stkPush = async (phone: string, amount: number, ref: string) => {
  const token = await getMpesaToken();
  const ts = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${ts}`).toString('base64');
  return axios.post(`${BASE}/mpesa/stkpush/v1/processrequest`, {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password, Timestamp: ts, TransactionType: 'CustomerPayBillOnline',
    Amount: amount, PartyA: `254${phone.slice(1)}`, PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: `254${phone.slice(1)}`, CallBackURL: `${process.env.API_URL}/api/payments/mpesa/callback`,
    AccountReference: ref, TransactionDesc: 'Gas/Water Order'
  }, { headers: { Authorization: `Bearer ${token}` } });
};