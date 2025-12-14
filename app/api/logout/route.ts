import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.json({ success: true });

  // Remove the auth_token
  response.cookies.set("auth_token", "", {
    httpOnly: true,          // must match original
    secure: process.env.NODE_ENV === "production", // must match original
    sameSite: "strict",      // must match original
    path: "/",               // must match original
    expires: new Date(0),    // explicitly expire
  });

  return response;
}
