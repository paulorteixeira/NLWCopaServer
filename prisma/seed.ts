import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data:{
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/paulorteixeira'
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title: 'Exemplo Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants:{
                create:{
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-05T12:00:19.556Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-08T12:00:19.556Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',

            guesses:{
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints:1,

                    participant:{
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })


}

main()