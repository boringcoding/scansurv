/**
 * Return the service account if exists in app.yaml. We need it in .env for dev
 */
function upload() {
  if (process.env.GCS_SERVICE_ACCOUNT) {
    return {
      provider: "google-cloud-storage",
      providerOptions: {
        serviceAccount: JSON.parse(process.env.GCS_SERVICE_ACCOUNT),
        bucketName: process.env.GCS_BUCKET_NAME,
        publicFiles: true,
        uniform: false,
        baseUrl: process.env.GCS_BASE_URL,
      },
    };
  } else {
    return {
      provider: "google-cloud-storage",
      providerOptions: {
        bucketName: process.env.GCS_BUCKET_NAME,
        publicFiles: true,
        uniform: false,
        baseUrl: process.env.GCS_BASE_URL,
      },
    };
  }
}

module.exports = ({ env }) => ({
  /**
   * @see https://github.com/Lith/strapi-provider-upload-google-cloud-storage
   */
  upload: upload(),

  /**
   * @see https://www.npmjs.com/package/strapi-provider-email-mailgun
   */
  email: {
    provider: "mailgun",
    providerOptions: {
      apiKey: env("MAILGUN_API_KEY"),
      domain: env("MAILGUN_DOMAIN"),
      host: env("MAILGUN_HOST", "api.eu.mailgun.net"),
    },
    settings: {
      defaultFrom: env("ADMIN_EMAIL_FROM"),
      defaultReplyTo: env("ADMIN_EMAIL_TO"),
    },
  },

  vercel: {
    token: env("VERCEL_TOKEN"),
    projectId: env("VERCEL_PROJECT_ID"),
    teamId: env("VERCEL_TEAM_ID"),
    deployStaging: env("VERCEL_DEPLOY_STAGING"),
    deployProduction: env("VERCEL_DEPLOY_PRODUCTION"),
    stagingSiteUrl: env("VERCEL_STAGING_SITE_URL"),
    productionSiteUrl: env("VERCEL_PRODUCTION_SITE_URL"),
  },
});
