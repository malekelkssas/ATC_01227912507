import { WrapDatabaseError } from '@/utils';
import { IWrite, IRead } from './interfaces';
import { Model, Document } from 'mongoose';

/**
 * REF: https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e
 */
export abstract class BaseRepository<T extends Document> implements IWrite<T>, IRead<T> {

    protected model: Model<T>;

    constructor(model: Model<T>) {
      this.model = model;
    }

    @WrapDatabaseError
    async create(item: Partial<T>): Promise<T> {
        const doc = await this.model.create(item);
        return doc;
    }

    abstract update(id: string, item: Partial<T>): Promise<T | null>;
    abstract delete(id: string): Promise<boolean>;
    abstract find(item: Partial<T>): Promise<T[]>;
    abstract findOne(id: string): Promise<T | null>;
    abstract findById(id: string): Promise<T | null>;
} 