import { Prisma } from '@prisma/client';
import prisma from './client'
import bcrypt from 'bcryptjs'

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
        const salt = (await bcrypt.genSalt(10)).toString();
        const user = await prisma.user.create({
            data: {
                ...u,
                password: await bcrypt.hash(u.password, salt)
            }
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
