import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: 1,
            username: "jeter",
            password: "hashed_password_1", // 請在應用層加密密碼
            email: "jeter@example.com",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 2,
            username: "zero",
            password: "hashed_password_2",
            email: "zero@example.com",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
        {
            id: 3,
            username: "sandy",
            password: "hashed_password_3",
            email: "sandy@example.com",
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        },
    ]);
}
