const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["form-submissions"].create(data, {
        files,
      });
    } else {
      entity = await strapi.services["form-submissions"].create(
        ctx.request.body
      );
    }

    entity = sanitizeEntity(entity, {
      model: strapi.models["form-submissions"],
    });

    let text = "";
    for (const [key, value] of Object.entries(entity.data.form)) {
      text += `<p><strong>${key}</strong>: ${value}<br></p>`;
    }

    await strapi.plugins["email"].services.email.send({
      to: process.env.ADMIN_EMAIL_TO,
      from: process.env.ADMIN_EMAIL_FROM,
      subject: `New form submission / ${entity.formName} / ${entity.data?.form?.name}`,
      html: `
      <h1>New ${entity.formName}</h1>
      ${text}`,
    });

    return entity;
  },
};
