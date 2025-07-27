import { NextRequest, NextResponse } from "next/server";

const allowedPathsDuringMaintenance = [
  "/maintenance",
  "/login",
  "/master",
  "/account",
  "/sysmaster",
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/logo.svg") {
    return NextResponse.next();
  }

  const isAllowedPath = allowedPathsDuringMaintenance.some((allowedPath) =>
    pathname.startsWith(allowedPath)
  );

  if (isAllowedPath) {
    return NextResponse.next();
  }

  let maintenanceEnabled = false;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "X-Middleware-Request": "true",
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      maintenanceEnabled = data.data?.enabled || false;
    }
  } catch (error) {
    console.error("Gagal memeriksa status maintenance: ", error);
  }

  if (maintenanceEnabled && !isAllowedPath) {
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|logo.svg).*)"],
};
