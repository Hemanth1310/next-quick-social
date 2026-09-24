import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@example.com",
    password: "Pass@123",
    posts: {
      create: [
        {
          title: "Kyoto here we are!",
          content: "Golden hour in Kyoto. 🍁 Spent the afternoon exploring hidden teahouses in Gion.",
          published: true,
        },
        {
          title: "Developer Journey : My first App",
          content: "Just deployed my first full-stack Next.js app with Prisma and PostgreSQL! 🚀 The developer experience with Server Actions is unreal. What's your favorite stack right now?",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@example.com",
    password: "Pass@123",
    posts: {
      create: [
        {
          title: "Computer science wisdom",
          content: 'There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton',
          published: true,
        },
      ],
    },
  },
];

export async function main() {
  try {
    for (const u of userData) {
      await prisma.user.create({ data: u });
    }
    console.log("Seeding finished successfully!");
  } catch (error) {
    console.error("Error while seeding:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();