import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("User").del();

    // Inserts seed entries
    await knex("User").insert([
        {
            id: 1,
            username: "jeter",
            password: "$2a$10$mksnLHazcYXhCKhrx4kmbuaqlJFTPyrBTmrG33eVQdYMS9HzGMI4G", // 請在應用層加密密碼
            email: "jeter@example.com",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        }
    ]);
}
