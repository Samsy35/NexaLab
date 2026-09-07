import { Router } from 'express';
import { z } from 'zod';

import { requireAuth } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = Router();

const moduleSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  description: z.string().min(5),
  category: z.string().min(2),
  order: z.number().int().default(0),
});

router.get('/', requireAuth, async (_req, res) => {
  const modules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
    include: {
      lessons: true,
      exercises: true,
    },
  });

  return res.json({ modules });
});

router.get('/:slug', requireAuth, async (req, res) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

  const module = await prisma.module.findUnique({
    where: { slug },
    include: {
      lessons: { orderBy: { order: 'asc' } },
      exercises: true,
    },
  });

  if (!module) {
    return res.status(404).json({ message: 'Module introuvable.' });
  }

  return res.json({ module });
});

router.post('/', requireAuth, async (req, res) => {
  const result = moduleSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: 'Données invalides', errors: result.error.flatten() });
  }

  const module = await prisma.module.create({ data: result.data });
  return res.status(201).json({ module });
});

export default router;
