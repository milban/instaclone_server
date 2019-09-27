import nodemailer from "nodemailer"
import sgTransport from "nodemailer-sendgrid-transport"
import { adjectives, nouns } from "./words"
import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.resolve(__dirname, ".env") })

export const generateSecret = () => {
  const adjectivesRandomNumber = Math.floor(Math.random() * (adjectives.length - 1))
  const nounsRandomNumber = Math.floor(Math.random() * (nouns.length - 1))
  return `${adjectives[adjectivesRandomNumber]} ${nouns[nounsRandomNumber]}`
}

const sendMail = email => {
  const options = {
    service: "SendGrid",
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  }
  const client = nodemailer.createTransport(sgTransport(options))
  return client.sendMail(email, (err, info) => {
    if (err) {
      console.log(error)
      return
    }
    console.log(`Message sent: ${info.response}`)
  })
}

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "milban@milbangram.milban",
    to: address,
    subject: "Login Secret for Milbangram ⭐️",
    html: `Hello! Your login secret is ${secret} <br/> Copy & Paste on the web to log in.`
  }
  sendMail(email)
}
