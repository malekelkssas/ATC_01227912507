export interface IRead<T> {
    find(item: Partial<T>): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    findById(id: string): Promise<T | null>;
  }