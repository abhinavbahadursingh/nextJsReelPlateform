import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/DB.connection";
import User from "@/models/User.model";
import { error } from "console";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "email is already in use" },
        { status: 400 }
      );
    }

    await User.create({
        email,
        password
    })

    return NextResponse.json(
        {message: "User register succussfully"},
        {status: 201}
    )
  } catch (error) {
    return NextResponse.json(
        {error: "failed to register user"},
        {status: 500}
    )
  }
}
