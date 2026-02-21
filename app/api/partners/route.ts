import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const DB_PATH = path.join(process.cwd(), 'data', 'partner-applications.json');

async function readApplications(): Promise<unknown[]> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(raw) as unknown[];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  const body: unknown = await req.json();

  const applications = await readApplications();
  const entry = {
    id: `partner_${Date.now()}`,
    submittedAt: new Date().toISOString(),
    ...(body as object),
  };
  applications.push(entry);

  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(applications, null, 2), 'utf-8');

  return NextResponse.json({ ok: true, id: entry.id }, { status: 201 });
}

export async function GET() {
  const applications = await readApplications();
  return NextResponse.json(applications);
}
