import request from 'supertest';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

import app from '../src/app';
import { prisma } from '../src/lib/prisma';

describe('NexaLab API', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should return health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  it('should register a user and return a token', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe('alice@example.com');
    expect(response.body.token).toBeTruthy();
  });
});
