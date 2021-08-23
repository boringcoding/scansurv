const forgotPasswordTemplate = require("./email-templates/forgot-password");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "091061845d3be0a2bfc24a4c8c7a47b7"),
    },
    url: env("ADMIN_PATH", "/admin"),
    forgotPassword: {
      from: env("ADMIN_EMAIL_FROM", "support@webandroll.co.uk"),
      replyTo: env("ADMIN_EMAIL_TO", "info@webandroll.co.uk"),
      emailTemplate: forgotPasswordTemplate,
    },
  },
});
