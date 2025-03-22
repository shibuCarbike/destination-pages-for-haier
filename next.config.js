module.exports = {
  reactStrictMode: false,
  swcMinify: true,

  env: {
    API_PORT:
      process.env.NODE_ENV === "development"
        ? "https://api.comparos.in"
        : "https://api.comparos.in",
  },
  distDir: "build_50",
  generateBuildId: async () => {
    return "" + new Date().getTime();
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      
      {
        protocol: 'https',
        hostname: 'delen.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.carbike360.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cmv360.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.cmv360.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '15.206.219.185:8080',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd1odgbsvvxl2qd.cloudfront.net',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '**',
      },

      ],
    minimumCacheTTL: 600,
  },
};
