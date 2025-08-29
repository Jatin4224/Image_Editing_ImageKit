// app/api/auth/route.ts
import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.PRIVATE_KEY as string,
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
  });

  return NextResponse.json({
    token,
    expire,
    signature,
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  });
}
