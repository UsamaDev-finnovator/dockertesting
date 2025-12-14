import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password, rememberMe } = await req.json();
  const protocolCheck = req.headers.get("x-forwarded-proto");
  const loginReponse = await fetch(
    `${process.env.BS_API_KEY}/api/Authentication`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: username, password }),
    }
  );
  const res = await loginReponse.json();
  const data = res;
  if (data.Code != 200) {
    return NextResponse.json(
      { statusCode: data.Code, error: data.Data },
      { status: data.Code }
    );
  }

  const response = NextResponse.json({ success: true, data });

  response.cookies.set("auth_token", data.Token, {
    httpOnly: true,
    secure: protocolCheck === "http" ? false : true,
    sameSite: "strict",
    path: "/",
    ...(rememberMe ? { maxAge: 60 * 60 * 24 * 7 } : {}),
  });

  return response;
}
