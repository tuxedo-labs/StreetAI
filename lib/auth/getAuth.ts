import { auth } from "@clerk/nextjs/server";

export const getAuth = async () => {
    const { userId } = await auth();
    return { userId, isAuthenticated: !!userId };
};