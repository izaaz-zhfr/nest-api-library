import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding borrowings...');

  // Pastikan ada beberapa buku dan member
  const member1 = await prisma.member.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'Member Satu' },
  });

  const member2 = await prisma.member.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Member Dua' },
  });

  const book1 = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, title: 'Book A', author: 'Author A', year: 2020 },
  });

  const book2 = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, title: 'Book B', author: 'Author B', year: 2021 },
  });

  // Hapus semua peminjaman yang ada (opsional — comment jika tidak diinginkan)
  await prisma.borrowing.deleteMany({});

  // Tambahkan beberapa data peminjaman
  const b1 = await prisma.borrowing.create({
    data: {
      memberId: member1.id,
      bookId: book1.id,
      borrowDate: new Date(),
    },
  });

  const b2 = await prisma.borrowing.create({
    data: {
      memberId: member2.id,
      bookId: book2.id,
      borrowDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      returnDate: new Date(),
    },
  });

  console.log('Seeded borrowings:', { b1, b2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
