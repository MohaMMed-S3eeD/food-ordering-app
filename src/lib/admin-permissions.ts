import { Session } from "next-auth";
import { UserRole } from "@/constants/enums";

/**
 * Checks if the user is an AdminView (view-only admin)
 * AdminView users can see everything but cannot save/update/delete
 */
export function isAdminView(session: Session | null): boolean {
  return session?.user?.name === "AdminView" && session?.user?.role === UserRole.ADMIN;
}

/**
 * Checks if the user has full admin permissions (can save/update/delete)
 */
export function isFullAdmin(session: Session | null): boolean {
  return session?.user?.role === UserRole.ADMIN && session?.user?.name !== "AdminView";
}

/**
 * Checks if the user is any type of admin (full or view-only)
 */
export function isAnyAdmin(session: Session | null): boolean {
  return session?.user?.role === UserRole.ADMIN;
}