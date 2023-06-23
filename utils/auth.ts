import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route";

export const getServerAuthSession = () => getServerSession(authOptions)