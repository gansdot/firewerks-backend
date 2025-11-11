module.exports = {
  apps: [
    {
      name: "firewerks-backend",
      script: "./backend/dist/server.js",
      cwd: "/home/ubuntu/firewerks",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 8000,
        MONGO_URI: "mongodb://localhost:27017/ecommerce",
        JWT_SECRET: "mysecretkey",
        VITE_RAZORPAY_KEY_ID: "rzp_test_RYark9QTe4ihBy",
        VITE_RAZORPAY_KEY_SECRET: "nNriEThkegmFkosQTddTKOEo",
        ADMIN_KEY: "supersecret123",
        ADMIN_USR: "deeparirev@gmail.com",
        EMAIL_USER: "ganeshanm.gsa@gmail.com",
        EMAIL_PASS: "wgev hdwk hhek feou",
      },
    },
  ],
};
