import emailjs from "@emailjs/browser";

// Function to send rejection email
const sendProgressEmail = (templateParams) => {
  const serviceID = "service_pkrntnq"; // Replace with your EmailJS service ID
  const templateID = "template_35mz4yc"; // Replace with your EmailJS template ID
  const publicKey = "68OBi16__a-QZKasA"; // Replace with your EmailJS user ID

  return emailjs
    .send(serviceID, templateID, templateParams, publicKey)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
    });
};

export default sendProgressEmail;

