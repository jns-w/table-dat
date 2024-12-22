import { NextRequest, NextResponse } from "next/server"

const allowedOrigins = ["*"]

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Origin": "*",
}

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const isPreflight = request.method === "OPTIONS";
  if (isPreflight) {
    const preflightHeaders = new Headers(corsOptions);
    return NextResponse.json({}, {
      headers: preflightHeaders
    })
  }

  const response = NextResponse.next();

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response;

}

// export const config = {
//   matcher: "/"
// }