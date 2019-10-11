import { prisma } from "../../../../generated/prisma-client"

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request)
      const { postId } = args
      const { user } = request
      const filterOpts = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      }
      try {
        const likeExists = await prisma.$exists.like(filterOpts)
        if (likeExists) {
          await prisma.deleteManyLikes(filterOpts)
        } else {
          await prisma.createLike({ user: { connect: { id: user.id } }, post: { connect: { id: postId } } })
        }
      } catch (error) {
        console.log(error)
        return false
      }
      return true
    }
  }
}
