/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    domains: ["d4lnyw05kel00.cloudfront.net"],
  },
  i18n: {
    locales: ["ja"],
    defaultLocale: "ja",
  },
  domains: [
    {
      domain: "http://localhost/",
      defaultLocale: "ja",
    },
    {
      domain: "https://www.anata-epilation.com/",
      defaultLocale: "ja",
    },
  ],
};

module.exports = nextConfig;
