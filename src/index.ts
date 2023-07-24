import "reflect-metadata";
import { PrismaClient } from "./generated/prisma-client/index";
import { buildSchema } from "type-graphql";
import { 
  PeriodCrudResolver,
  UserCrudResolver,
  relationResolvers
} from "./generated/type-graphql";
import { UserOverrideResolver } from "./views/graphql/userResolvers";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

export interface ApolloContext {
  expressContext: {
    req: express.Request,
    res: express.Response
  };
  prisma: PrismaClient;
};

const prisma = new PrismaClient();

async function main() {
  const schema = await buildSchema({
    resolvers: [
      PeriodCrudResolver,
      UserCrudResolver,
      UserOverrideResolver,
      ...relationResolvers
    ],
    validate: false,
  });
   
  // Connect the client
  await prisma.$connect();

  const app = express();
  const PORT = process.env.PORT || 9000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  
  const apollo = new ApolloServer({
    schema,
    context: ({ req, res }): ApolloContext => ({ expressContext: { req, res }, prisma })
  });

  await apollo.start();

  apollo.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}/graphql`));
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })