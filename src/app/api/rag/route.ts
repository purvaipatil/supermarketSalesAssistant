import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { salesTableSchema } from "@/lib/schema";
import { generateSQLQuery, getFinalAnswer } from "@/utils/gemini";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  try {
    const sql = await generateSQLQuery(query, salesTableSchema);

    if (!sql.toLowerCase().includes("select")) {
      return NextResponse.json({ result: "Invalid SQL generated." });
    }

    const { rows } = await pool.query(sql);
    const finalAnswer = await getFinalAnswer(query, rows);

    return NextResponse.json({ result: finalAnswer, sql });
  } catch (err) {
    return NextResponse.json({ result: "An error occurred.", error: String(err) }, { status: 500 });
  }
}
