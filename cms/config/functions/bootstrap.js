"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

// plural bug fix
const pluralize = require("pluralize");
const plural = pluralize.plural;
pluralize.plural = (word) => {
  if (word == "button") return "buttonn";
  else if (word == "Staff") return "Staffs";
  return plural(word);
};

module.exports = () => {};
