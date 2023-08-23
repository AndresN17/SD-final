module.exports = {
  apps: [{
    name:"kiosku",
    script: 'index.js',
    env: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
};
