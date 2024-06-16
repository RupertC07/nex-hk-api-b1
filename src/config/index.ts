import "dotenv/config";

const config = {
  app: {
    port: process.env.PORT || 8080,
    env: process.env.PROJECT_ENV,
  },
  db: {
    connection_string: process.env.DATABASE_URL,
  },
  key: {
    secret: process.env.JWT_SECRET_KEY,
    x_key: process.env.API_KEY,
    refreshSecret: process.env.JWT_REFRESH_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  url: {
    local: `http://localhost:${process.env.PORT || 8000}/api/v2`,
    forward: `${process.env.PORT_FORWARD_URL}api/v2`,
  },
  email: {
    address: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
};

export default config;
