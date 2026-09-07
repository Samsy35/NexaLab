import { prisma } from './lib/prisma';

async function main() {
  await prisma.module.upsert({
    where: { slug: 'programmation' },
    update: {},
    create: {
      slug: 'programmation',
      title: 'Programmation',
      description: 'Découverte des bases de la logique et du développement.',
      category: 'code',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Introduction à la programmation',
            content: 'Comprendre la syntaxe, les variables et les fonctions.',
            order: 1,
            xp: 20,
          },
          {
            title: 'Structures de contrôle',
            content: 'Apprendre les conditions et boucles.',
            order: 2,
            xp: 25,
          },
        ],
      },
      exercises: {
        create: [
          {
            type: 'CODE',
            title: 'Créer une fonction de somme',
            prompt: 'Écrire une fonction qui additionne deux nombres.',
            starterCode: 'function somme(a, b) {\n  return a + b;\n}\n',
            solution: 'function somme(a, b) { return a + b; }',
          },
        ],
      },
    },
  });

  await prisma.module.upsert({
    where: { slug: 'maintenance' },
    update: {},
    create: {
      slug: 'maintenance',
      title: 'Maintenance',
      description: 'Diagnostiquer, réparer et valider des pannes système.',
      category: 'support',
      order: 2,
      lessons: {
        create: [
          {
            title: 'Diagnostic de pannes',
            content: 'Identifier les symptômes et les principales causes.',
            order: 1,
            xp: 20,
          },
        ],
      },
      exercises: {
        create: [
          {
            type: 'MAINTENANCE',
            title: 'Panne réseau locale',
            prompt: 'Diagnostiquer pourquoi un poste ne détecte plus le réseau.',
            starterCode: '',
            solution: 'Vérifier le câble, le routeur, la configuration IP et le switch.',
          },
        ],
      },
    },
  });

  await prisma.module.upsert({
    where: { slug: 'reseaux' },
    update: {},
    create: {
      slug: 'reseaux',
      title: 'Réseaux',
      description: 'Comprendre les protocoles, l’adressage et la sécurité.',
      category: 'network',
      order: 3,
      lessons: {
        create: [
          {
            title: 'Adresses IP',
            content: 'Comprendre la différence entre IPv4 et IPv6.',
            order: 1,
            xp: 20,
          },
        ],
      },
      exercises: {
        create: [
          {
            type: 'QUIZ',
            title: 'Quiz réseaux',
            prompt: 'Quel protocole est utilisé pour la résolution d’adresses sur un réseau local ?',
            starterCode: '',
            solution: 'DNS',
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
