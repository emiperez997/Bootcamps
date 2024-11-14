export type Config = {
  port: number;
};

export default () => ({
  port: process.env.PORT || 5000,
  newsApiKey: process.env.NEWS_API_KEY,
});
