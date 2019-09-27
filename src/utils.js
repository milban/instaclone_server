import { adjectives, nouns } from "./words"

export const generateSecret = () => {
  const adjectivesRandomNumber = Math.floor(Math.random() * (adjectives.length - 1))
  const nounsRandomNumber = Math.floor(Math.random() * (nouns.length - 1))
  return `${adjectives[adjectivesRandomNumber]} ${nouns[nounsRandomNumber]}`
}
