import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { User } from "../../generated/type-graphql";
import { getPrismaFromContext } from "../../generated/type-graphql/helpers";
import { PrismaClient } from "../../generated/prisma-client";
import { ApolloContext } from "../../index";

@TypeGraphQL.InputType({
    isAbstract: true
})

export class UserLoginInputData {
    @TypeGraphQL.Field(_type => String, {
      nullable: false
    })
    id!: string;
  
    @TypeGraphQL.Field(_type => String, {
      nullable: true
    })
    displayName?: string | null;
  
    @TypeGraphQL.Field(_type => String, {
      nullable: false
    })
    email!: string; 
}

@TypeGraphQL.ArgsType()
export class CustomCreateUserArgs {
    @TypeGraphQL.Field(_type => UserLoginInputData, {
        nullable: false,
    })
    data!: UserLoginInputData;
}

@TypeGraphQL.Resolver(_of => User)
export class UserOverrideResolver {
    @TypeGraphQL.Mutation(returns => User, { nullable: false })
    async loginUser(
        @TypeGraphQL.Ctx() ctx: ApolloContext,
        @TypeGraphQL.Info() info: GraphQLResolveInfo,
        @TypeGraphQL.Args() args: CustomCreateUserArgs,
    ): Promise<User> {
        const prisma: PrismaClient = getPrismaFromContext(ctx);
        const { id, displayName, email } = args.data;

        const existingUser = await prisma.user.findFirst({
            where: {
                id: id,
                email: email
            },
            include: {
                periods: true
            }
        });
        
        return !existingUser 
            ? await prisma.user.create({
                data: {
                    id, 
                    displayName, 
                    email, 
                    periods: { 
                        create: { 
                            numbersDrawn: [],
                            numbersNotDrawn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
                            savingsRange: [1, 100],
                            totalSavings: 0
                        } 
                    }
                }
            })
            : existingUser
    }
}