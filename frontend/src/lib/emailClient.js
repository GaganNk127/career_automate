import emailjs from "@emailjs/browser";
import { FRONTEND_URL } from "./config";

// Environment-driven config
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_pkrntnq";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "68OBi16__a-QZKasA";

// Use ONLY two templates across the app
// primary: invitations, progression, general positive flows
// secondary: rejections, alerts, generic notifications
const TEMPLATE_MAP = {
  primary: import.meta.env.VITE_EMAILJS_TEMPLATE_PRIMARY || "template_us3bnuq",
  secondary: import.meta.env.VITE_EMAILJS_TEMPLATE_SECONDARY || "template_us3bnuq",
};

// Basic guard so we fail with a clear message in dev
const ensureConfigured = (templateId) => {
  if (!SERVICE_ID || !PUBLIC_KEY || !templateId) {
    const missing = [
      !SERVICE_ID && "VITE_EMAILJS_SERVICE_ID",
      !PUBLIC_KEY && "VITE_EMAILJS_PUBLIC_KEY",
      !templateId && "templateId",
    ]
      .filter(Boolean)
      .join(", ");
    throw new Error(`EmailJS configuration missing: ${missing}`);
  }
};

// Helper to normalize and enrich template params
const buildParams = (params = {}) => {
  let defaultUserId;
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      defaultUserId =
        localStorage.getItem("userId") ||
        localStorage.getItem("technicalUserId") ||
        localStorage.getItem("communicationUserId");
    }
  } catch (_) {}

  return {
    frontend_url: FRONTEND_URL,
    timestamp: new Date().toISOString(),
    user_id: params.user_id ?? defaultUserId,
    ...params,
  };
};

// Send with a logical template key defined above
export const sendEmail = async (templateKey, templateParams = {}) => {
  const templateId = TEMPLATE_MAP[templateKey];
  ensureConfigured(templateId);
  const params = buildParams(templateParams);
  return emailjs.send(SERVICE_ID, templateId, params, PUBLIC_KEY);
};

// Send with an explicit template ID (escape hatch)
export const sendEmailRaw = async (templateId, templateParams = {}) => {
  ensureConfigured(templateId);
  const params = buildParams(templateParams);
  return emailjs.send(SERVICE_ID, templateId, params, PUBLIC_KEY);
};

export const sendCommonEmail = async (templateParams = {}) => {
  return sendEmail("primary", templateParams);
};

export const sendRawMessage = async ({ to_email, subject, message, ...rest } = {}) => {
  return sendEmail("secondary", { to_email, subject, message, ...rest });
};

export default { sendEmail, sendEmailRaw, sendCommonEmail, sendRawMessage };
