import { FilterQuery } from "mongoose";

export interface IRead<T> {
    find(item: Partial<T>): Promise<T[]>;
    findOne(item: FilterQuery<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
  }