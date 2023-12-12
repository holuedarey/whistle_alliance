import { Injectable } from '@angular/core';
import { get, set, setMany, clear } from 'idb-keyval';
import { IndexedDbKey } from '../enums/indexed-db-key.enum';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  async dbSet<T>(dbKey: IndexedDbKey, value: T): Promise<void> {
    return await set(dbKey, value);
  }

  async dbSetMany<T>(entries: [dbKey: IndexedDbKey, value: T][]): Promise<void> {
    return await setMany(entries);
  }

  async dbGet<T>(dbKey: IndexedDbKey): Promise<T | undefined> {
    return await get<T>(dbKey);
  }

  async dbClear(): Promise<void> {
    return await clear();
  }
}
