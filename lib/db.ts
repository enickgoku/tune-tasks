import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

// Stops hot reload from creating new connections.

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
