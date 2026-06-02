import { NextResponse } from "next/server";
import { sendLeadAlert } from "@/lib/lead-alert";
import { supabaseAdmin } from "@/lib/supabase-admin";

type LeadInsert = {
  name: string;
  phone: string;
  experience: string;
  visit_date: string;
  visit_time: string;
};

function parseLeadBody(body: unknown): LeadInsert | null {
  if (!body || typeof body !== "object") return null;
  const { name, phone, experience, visit_date, visit_time } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof experience !== "string" ||
    typeof visit_date !== "string" ||
    typeof visit_time !== "string"
  ) {
    return null;
  }
  const trimmed = {
    name: name.trim(),
    phone: phone.trim(),
    experience: experience.trim(),
    visit_date: visit_date.trim(),
    visit_time: visit_time.trim(),
  };
  if (Object.values(trimmed).some((v) => !v)) return null;
  return trimmed;
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const lead = parseLeadBody(body);
  if (!lead) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("leads").insert(lead);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  void sendLeadAlert(lead);

  return NextResponse.json({ ok: true }, { status: 201 });
}
