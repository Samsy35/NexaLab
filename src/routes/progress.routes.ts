import { Router } from 'express';
import { z } from 'zod';

import { requireAuth } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = Router();

const progressUpdateSchema = z.object({
  moduleId: z.string().uuid(),
  completedLessons: z.number().int().min(0).default(0),
  completedExercises: z.number().int().min(0).default(0),
  xp: z.number().int().min(0).default(0),
});

router.get('/me', requireAuth, async (req, res) => {
  const progresses = await prisma.progress.findMany({
    where: { userId: req.user!.id },
    include: { module: true },
    orderBy: { updatedAt: 'desc' },
  });

  return res.json({ progresses });
});

router.post('/update', requireAuth, async (req, res) => {
  const result = progressUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: 'Données invalides', errors: result.error.flatten() });
  }

  const { moduleId, completedLessons, completedExercises, xp } = result.data;

  const module = await prisma.module.findUnique({ where: { id: moduleId } });
  if (!module) {
    return res.status(404).json({ message: 'Module introuvable.' });
  }

  const progress = await prisma.progress.upsert({
    where: {
      userId_moduleId: {
        userId: req.user!.id,
        moduleId,
      },
    },
    update: {
      completedLessons,
      completedExercises,
      xp,
      completedAt: completedLessons > 0 || completedExercises > 0 ? new Date() : null,
    },
    create: {
      userId: req.user!.id,
      moduleId,
      completedLessons,
      completedExercises,
      xp,
      completedAt: completedLessons > 0 || completedExercises > 0 ? new Date() : null,
    },
  });

  return res.status(200).json({ progress });
});

export default router;
