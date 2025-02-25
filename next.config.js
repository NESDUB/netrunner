/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fonts.googleapis.com"],
  },
  webpack: (config) => {
    // Add support for importing 3D model files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/models/",
          outputPath: "static/models/",
        },
      },
    });

    // Configure CSS Modules naming pattern
    const cssLoader = config.module.rules
      .find(rule => rule.oneOf?.find(r => r.sideEffects === false))
      .oneOf.find(r => r.sideEffects === false)
      .use.find(u => u.loader?.includes('css-loader'));
    
    if (cssLoader && cssLoader.options) {
      cssLoader.options.modules = {
        ...cssLoader.options.modules,
        localIdentName: process.env.NODE_ENV === 'development' 
          ? '[folder]__[local]' // In development: MainLayout__header, Home__canvas
          : '[hash:base64:8]'   // In production: keep it minified
      };
    }
    
    return config;
  },
  // Configure headers for better security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig