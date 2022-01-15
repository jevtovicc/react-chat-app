import { Prisma } from '@prisma/client';
import prisma from './client'

const userData: Prisma.UserCreateInput[] = [
    {
        firstName: 'Elon',
        lastName: 'Musk',
        username: 'Elon Musk',
        password: 'test123'
    },
    {
        firstName: 'Bill',
        lastName: 'Gates',
        username: 'Bill Gates',
        password: 'test123'
    },
    {
        firstName: 'Filip',
        lastName: 'Jevtovic',
        username: 'jevtovicc',
        password: 'test123'
    },
    {
        firstName: 'Mark',
        lastName: 'Zuckerberg',
        username: 'Mark Zuckerberg',
        password: 'test123'
    },

]

async function main() {
    console.log('Start seeding...')
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u
        })
    }
    console.log('Seeding finished')
}

main()
    .catch(e => {
        console.log('Greska')
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
