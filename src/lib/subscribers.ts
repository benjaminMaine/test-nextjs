// In-memory store — resets on server restart (demo purposes)
const store = {
  emails: new Set<string>(),
};

export function addSubscriber(email: string): { success: boolean; alreadyExists: boolean } {
  if (store.emails.has(email)) {
    return { success: false, alreadyExists: true };
  }
  store.emails.add(email);
  return { success: true, alreadyExists: false };
}

export function getSubscriberCount(): number {
  return store.emails.size;
}
