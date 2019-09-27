import { prisma } from "../../../../generated/prisma-client"

export default {
  Query: {},
  Mutation: {
    createAccount: async (_, args) => {
      const { userName, email, firstName, lastName, bio } = args
      const user = prisma.createUser({ userName, email, firstName: "", lastName, bio: "" })
      return user
    }
  }
}
