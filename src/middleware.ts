import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Auth has been removed. All routes are publicly accessible. */
export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};