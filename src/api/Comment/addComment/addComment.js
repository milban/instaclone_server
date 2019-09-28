import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client"

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request)
      const { postId, text } = args
      const { user } = request
      try {
        const newComment = await prisma.createComment({ user: { connect: { id: user.id } }, text, post: { connect: { id: postId } } })
        return newComment
      } catch (error) {
        console.log(error)
      }
    }
  }
}
