const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@theme': 'dark',
              '@primary-color': '#1D3354',
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