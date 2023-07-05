import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const main = async () => {
    const period = await client.period.findFirst({
        where: { ownerId: "44c3b4a7-5b22-4e6b-a4ee-6440ca2fd15a" },
        include: { owner: true }
    })

    console.log(period);

    client.$disconnect();
};

main();