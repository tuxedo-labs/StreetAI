import { auth } from "@clerk/nextjs/server";

export const useAuth = async () => {
    const { userId } = await auth();
    return { userId, isAuthenticated: !!userId };
};
