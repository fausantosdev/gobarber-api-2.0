import { sign, verify } from 'jsonwebtoken'

import { env } from '../env'

const generateJWT = (payload: object, subject: string): string => {
  return sign(payload, env.APP_KEY, { subject, expiresIn: '1d' })
}

const decodeJWT = (token: string) => {
  return verify(token, env.APP_KEY as string)
}

export { generateJWT, decodeJWT }
