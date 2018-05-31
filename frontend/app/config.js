const config = {
  apiServer: {
    url: process.env.API_URL,
  },
  bootstrapURLKeys: {
    key: process.env.GOOGLE_API_KEY || '[YOUR_API_KEY]',
    language: 'en',
  },
};

export default config;
