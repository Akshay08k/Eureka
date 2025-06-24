export async function sendEmail(to: string, subject: string, body: string) {
  console.log(`Send email to ${to} with subject "${subject}" and body:\n${body}`);
  // integrate nodemailer or Resend API here
}