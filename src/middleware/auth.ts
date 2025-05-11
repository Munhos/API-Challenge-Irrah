import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "";

export interface AuthenticatedRequest extends Request {
  client?: JwtPayload & {
    id?: string;
    cnpj?: string;
    cpf?: string;
    accessLevel?: 'admin' | 'user';
  };
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).json({ error: 'Cabeçalho Authorization ausente' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Token inválido ou expirado' });
      return;
    }

    const clientPayload = decoded as AuthenticatedRequest["client"];

    req.client = clientPayload;
    next();
  });
};
