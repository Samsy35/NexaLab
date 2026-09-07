import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: Number(process.env.PORT ?? '4000'),
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-key',
  databaseUrl: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
  nodeEnv: process.env.NODE_ENV ?? 'development',
};

export default env;
