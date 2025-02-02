import { Request } from 'express'

import { decodeJWT } from '../lib/jwt'
import { AppError } from '../errors/AppError'

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  response,
  next
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('JWT token is missing', 401)

  const [, token] = authHeader.split(' ')

  try {
    const decoded = decodeJWT(token)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new Error('Invalid JWT token')
  }
}
