const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const before = await prisma.borrowing.count();
  console.log('Borrowing count before:', before);

  const result = await prisma.borrowing.deleteMany({});
  console.log('Deleted count:', result.count);

  const after = await prisma.borrowing.count();
  console.log('Borrowing count after:', after);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
