const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const movies = [
    {
      title: 'Inception',
      genre: 'Sci-Fi',
      posterUrl: 'https://image.tmdb.org/t/p/w500/811DjJTon9gD6hZ8nCjBgJ0aB5I.jpg',
      status: 'Completed',
      rating: 5,
    },
    {
      title: 'Interstellar',
      genre: 'Sci-Fi',
      posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      status: 'Watching',
      rating: 4,
    },
    {
      title: 'The Matrix',
      genre: 'Action',
      posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GvwJwB02xcI1.jpg',
      status: 'Completed',
      rating: 5,
    }
  ]

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie
    })
  }
  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
