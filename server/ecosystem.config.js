module.exports = {
  apps: [
    {
      name: "teamtrack",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
