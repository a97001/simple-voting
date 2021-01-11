// See https://tailwindcss.com/docs/configuration for details
const windmill = require('@windmill/react-ui/config')

module.exports = windmill({
  purge: ["./src/**/*.js"],
  // https://github.com/tailwindlabs/tailwindcss-forms
  plugins: [require("@tailwindcss/forms")],
});
