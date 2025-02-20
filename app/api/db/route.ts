import { createConnection } from '@/lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  const db_name = process.env.DB_CHECK;
  try {
    const db = await createConnection();
    const sql = 'SELECT * FROM ' + db_name;
    const [admin] = await db.query(sql);
    return NextResponse.json(admin);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
