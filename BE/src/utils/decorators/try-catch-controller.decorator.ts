import { NextFunction, Request, Response } from 'express';

export function TryCatchController(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    console.log(`Decorating method: ${propertyKey}`);
    
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        try {
            return await originalMethod.apply(this, [req, res, next]);
        } catch (error) {
            next(error);
        }
    };
    
    return descriptor;
}