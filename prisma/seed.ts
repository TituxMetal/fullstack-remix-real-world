import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2'

const prisma = new PrismaClient()

async function seed() {
  const email = 'titux@remix.run'
  const username = email.split('@')[0]

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await argon.hash('tituxiscool')

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      },
      profile: {
        create: {
          username
        }
      }
    }
  })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
