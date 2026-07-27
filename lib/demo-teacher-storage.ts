import { cookies } from "next/headers";

export interface DemoStudent {
  id: string;
  email: string;
  fullName: string;
}

export interface DemoClass {
  id: string;
  name: string;
  code: string;
  members: DemoStudent[];
}

export interface DemoAssignment {
  id: string;
  title: string;
  description: string | null;
  classId: string;
  className: string;
  dueDate: string | null;
  uebungId: string | null;
}

interface DemoTeacherData {
  classes: DemoClass[];
  assignments: DemoAssignment[];
}

const COOKIE_NAME = "demo_teacher_data";

function safeParse<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(decodeURIComponent(raw)) as T;
  } catch {
    return fallback;
  }
}

export async function getDemoTeacherData(): Promise<DemoTeacherData> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  return safeParse<DemoTeacherData>(raw, { classes: [], assignments: [] });
}

export async function setDemoTeacherData(data: DemoTeacherData) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encodeURIComponent(JSON.stringify(data)), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
  });
}

export async function getDemoClasses(): Promise<DemoClass[]> {
  return (await getDemoTeacherData()).classes;
}

export async function getDemoAssignments(): Promise<DemoAssignment[]> {
  return (await getDemoTeacherData()).assignments;
}

export async function getDemoClassById(id: string): Promise<DemoClass | null> {
  return (await getDemoClasses()).find((c) => c.id === id) ?? null;
}

export async function createDemoClass(name: string): Promise<DemoClass> {
  const data = await getDemoTeacherData();
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const newClass: DemoClass = {
    id: crypto.randomUUID(),
    name,
    code,
    members: [],
  };
  data.classes.push(newClass);
  await setDemoTeacherData(data);
  return newClass;
}

export async function addDemoStudent(
  classId: string,
  email: string
): Promise<DemoStudent> {
  const data = await getDemoTeacherData();
  const cls = data.classes.find((c) => c.id === classId);
  if (!cls) throw new Error("Klasse nicht gefunden");

  const student: DemoStudent = {
    id: crypto.randomUUID(),
    email,
    fullName: email.split("@")[0],
  };
  cls.members.push(student);
  await setDemoTeacherData(data);
  return student;
}

export async function createDemoAssignment(
  title: string,
  description: string,
  classId: string,
  uebungId: string | null
): Promise<DemoAssignment> {
  const data = await getDemoTeacherData();
  const cls = data.classes.find((c) => c.id === classId);
  if (!cls) throw new Error("Klasse nicht gefunden");

  const assignment: DemoAssignment = {
    id: crypto.randomUUID(),
    title,
    description: description || null,
    classId,
    className: cls.name,
    dueDate: null,
    uebungId: uebungId || null,
  };
  data.assignments.push(assignment);
  await setDemoTeacherData(data);
  return assignment;
}

// Deterministische Demo-Fortschritte für Lernende (keine echte DB nötig)
function pseudoRandomPercentage(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);
  // Werte zwischen 35 % und 100 %
  return 35 + (abs % 66);
}

export interface DemoStudentProgress {
  studentId: string;
  fullName: string;
  average: number;
  assignments: { assignmentId: string; title: string; score: number }[];
}

export async function getDemoProgressByClass(
  classId: string
): Promise<DemoStudentProgress[]> {
  const data = await getDemoTeacherData();
  const cls = data.classes.find((c) => c.id === classId);
  if (!cls) return [];

  const classAssignments = data.assignments.filter((a) => a.classId === classId);

  return cls.members.map((m) => {
    const scores = classAssignments.map((a) => ({
      assignmentId: a.id,
      title: a.title,
      score: pseudoRandomPercentage(`${m.id}:${a.id}`),
    }));
    const average =
      scores.length === 0
        ? 0
        : Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);
    return {
      studentId: m.id,
      fullName: m.fullName,
      average,
      assignments: scores,
    };
  });
}
