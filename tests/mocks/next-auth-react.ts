export const useSession = jest.fn(() => ({
  data: { user: { id: "user-1", name: "TestUser", email: "test@betday.com" } },
  status: "authenticated",
}));

export const signIn = jest.fn();
export const signOut = jest.fn();
export const SessionProvider = ({ children }: { children: React.ReactNode }) => children;
