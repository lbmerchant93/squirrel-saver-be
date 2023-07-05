import { Prisma, PrismaClient, user } from "@prisma/client";

const client = new PrismaClient();

const getUsers = () : Prisma.userCreateInput[] => [
    { email: "test@mail.com", "displayName": "test" },
    { email: "test1@mail.com", "displayName": "test1" },
    { email: "test2@mail.com", "displayName": "test2" }
];

const getPeriods = (users: user[]) : Prisma.periodCreateInput[] => [
    {
        owner: { connect : { id: users[0].id } }
    }, {
        owner: { connect : { id: users[1].id } }
    }, {
        owner: { connect : { id: users[2].id } }
    }
];

const main = async() => {
    const users = await Promise.all(
        getUsers().map(user => client.user.create({ data: user }))
    );
    const periods = await Promise.all(
        getPeriods(users).map(period => client.period.create({ data: period }))
    );
};

main();