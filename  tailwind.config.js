module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}",
  ],
  theme: {
    extend: {
      screens: {
        'a-cdk-sm': {'min': '600px', 'max': '959.98px'},
        'a-cdk-md': {'min': '960px', 'max': '1279.98px'},
      }
    },
  },
  plugins: [],
};
