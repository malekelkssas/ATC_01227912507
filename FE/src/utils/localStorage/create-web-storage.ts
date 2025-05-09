import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { LocalStorageConstants } from "../constants";

const createNoopStorage = () => {
  return {
    getItem(): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(value: unknown): Promise<unknown> {
      return Promise.resolve(value);
    },
    removeItem(): Promise<unknown> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === LocalStorageConstants.UNDEFINED
    ? createNoopStorage()
    : createWebStorage("local");

export { storage };