import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";
import { prisma } from "./db";

export type SubscriberResult = {
  success: boolean;
  alreadyExists: boolean;
};

export async function createSubscriber(email: string): Promise<SubscriberResult> {
  try {
    await prisma.subscriber.create({ data: { email } });
    return { success: true, alreadyExists: false };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      return { success: false, alreadyExists: true };
    }
    throw err;
  }
}

export async function getSubscriberCount(): Promise<number> {
  return prisma.subscriber.count();
}
