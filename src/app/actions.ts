"use server";

import { createSubscriber } from "@/lib/subscribers";

export type SubscribeState = {
  status: "idle" | "success" | "error" | "duplicate";
  message: string;
};

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = formData.get("email");

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { status: "error", message: "Adresse email invalide." };
  }

  const result = await createSubscriber(email.trim().toLowerCase());

  if (result.alreadyExists) {
    return { status: "duplicate", message: "Vous êtes déjà inscrit !" };
  }

  return { status: "success", message: "Inscription confirmée, merci !" };
}
