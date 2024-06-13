import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Admin = {
    id: Generated<string>;
    name: string;
    age: number | null;
    email: string;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
};
export type AdminAccounts = {
    id: Generated<string>;
    admin_id: string;
    password: string;
    trusted_device: string[];
    remember_token: string | null;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
};
export type Books = {
    id: Generated<string>;
    name: string;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
};
export type Posts = {
    id: Generated<string>;
    name: string;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
};
export type DB = {
    admin: Admin;
    admin_accounts: AdminAccounts;
    books: Books;
    posts: Posts;
};
