export interface Store<T> {
  create(item: Omit<T, 'id'>): T | Promise<T>;
  findMany(): T[] | Promise<T[]>;
}
