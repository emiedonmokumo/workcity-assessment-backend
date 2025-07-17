import { Request, Response, NextFunction } from 'express';

const roleCheck = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ msg: 'User role not found in token' });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ msg: 'Access denied: insufficient permissions' });
    }

    next();
  };
};

export default roleCheck;
