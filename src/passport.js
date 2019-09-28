import passport from "passport"
import passportJwt from "passport-jwt"
import { prisma } from "../generated/prisma-client"

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id })
    if (user !== null) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (error) {
    return done(error, false)
  }
}

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user
    }
    next()
  })(req, res, next)

passport.use(new JwtStrategy(jwtOpts, verifyUser))
passport.initialize()
