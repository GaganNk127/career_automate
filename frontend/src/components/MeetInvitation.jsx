
import emailjs from "@emailjs/browser";

const sendMeetInvitation = (templateParams) => {
  const serviceID = "service_pkrntnq"; 
  const templateID = "template_35mz4yc"; 
  const publicKey = "68OBi16__a-QZKasA"; 

  return emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
    });
};

export default sendMeetInvitation;
