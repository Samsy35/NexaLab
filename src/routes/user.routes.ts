import { Router } from 'express';

import { requireAuth } from '../middleware/auth';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'Utilisateur introuvable.' });
  }

  return res.json({ user });
});

export default router;
