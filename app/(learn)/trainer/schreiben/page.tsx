import { APP_NAME } from "@/lib/constants";
import { writingTasks } from "@/lib/writing-data";
import { WritingTrainer } from "@/components/exercises/writing-trainer";

export const metadata = {
  title: `Schreibtrainer – ${APP_NAME}`,
};

export default function WritingTrainerPage() {
  return <WritingTrainer tasks={writingTasks} />;
}
