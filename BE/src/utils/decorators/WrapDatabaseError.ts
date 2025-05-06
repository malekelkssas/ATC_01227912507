import { DatabaseError } from "@/utils/error/DatabaseError";

/**
 * REF: https://www.typescriptlang.org/docs/handbook/decorators.html
 * @param target: is not needed unless you're adding metadata or accessing class-level info.
 * @param propertyKey: is only useful for logging or diagnostics (e.g., logging which method threw an error).
 * @param descriptor: is the descriptor of the method -> (only modifying the method's implementation `via descriptor.value`).
 */

export function WrapDatabaseError(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
    
  console.log(`Decorating method: ${propertyKey}`);
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error: any) {
      throw new DatabaseError(error);
    }
  };
  return descriptor;
}