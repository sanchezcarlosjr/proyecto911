import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import dbConnect from "../lib/ dbConnect";

export async function middleware(request: NextRequest) {
    await dbConnect();
    return NextResponse.next();
}