const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@theme': 'light',
              '@primary-color': 'rgba(56, 103, 214,1.0)',
              '@secondary-color': '#6DAEDB',
              '@border-radius-base': '8px',
              '@checkbox-border-radius': '2px',
              '@card-radius': '10px',
              '@rate-star-size': '15px',
              '@font-family': 'Euclid Circular A Regular'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};