import { APP_NAME } from "@/lib/constants";
import { speakingTasks } from "@/lib/speaking-data";
import { SpeakingTrainer } from "@/components/exercises/speaking-trainer";

export const metadata = {
  title: `Sprechtrainer – ${APP_NAME}`,
};

export default function SpeakingTrainerPage() {
  return <SpeakingTrainer tasks={speakingTasks} />;
}
