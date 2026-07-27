import { cookies } from "next/headers";
import { getDemoTeacherData } from "./demo-teacher-storage";

export interface DemoJoinedClass {
  id: string;
  name: string;
  code: string;
}

export interface DemoLearnerAssignment {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
}

const COOKIE_NAME = "demo_learner_classes";

function safeParse<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(decodeURIComponent(raw)) as T;
  } catch {
    return fallback;
  }
}

async function getJoinedCodes(): Promise<string[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  return safeParse<string[]>(raw, []);
}

async function setJoinedCodes(codes: string[]) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encodeURIComponent(JSON.stringify(codes)), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
  });
}

export async function getDemoJoinedClasses(): Promise<DemoJoinedClass[]> {
  const codes = await getJoinedCodes();
  const teacherData = await getDemoTeacherData();
  return teacherData.classes
    .filter((c) => codes.includes(c.code))
    .map((c) => ({ id: c.id, name: c.name, code: c.code }));
}

export async function joinDemoClass(
  code: string
): Promise<DemoJoinedClass | null> {
  const normalized = code.trim().toUpperCase();
  const teacherData = await getDemoTeacherData();
  const cls = teacherData.classes.find((c) => c.code === normalized);
  if (!cls) return null;

  const codes = await getJoinedCodes();
  if (!codes.includes(cls.code)) {
    codes.push(cls.code);
    await setJoinedCodes(codes);
  }

  return { id: cls.id, name: cls.name, code: cls.code };
}

export async function getDemoClassByCode(
  code: string
): Promise<DemoJoinedClass | null> {
  const normalized = code.trim().toUpperCase();
  const joined = await getDemoJoinedClasses();
  return joined.find((c) => c.code === normalized) ?? null;
}

export async function getDemoClassAssignments(
  code: string
): Promise<DemoLearnerAssignment[]> {
  const normalized = code.trim().toUpperCase();
  const teacherData = await getDemoTeacherData();
  const cls = teacherData.classes.find((c) => c.code === normalized);
  if (!cls) return [];

  return teacherData.assignments
    .filter((a) => a.classId === cls.id)
    .map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      dueDate: a.dueDate,
    }));
}
