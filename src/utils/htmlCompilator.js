const fs = require("fs/promises");
const handlebars = require("handlebars");

const htmlCompilator = async (archive, context) => {
  const html = await fs.readFile(archive);
  const compilator = handlebars.compile(html.toString());
  const htmlString = compilator(context);

  return htmlString;
};

module.exports = htmlCompilator;
