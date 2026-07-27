import { APP_NAME } from "@/lib/constants";
import { listeningTasks } from "@/lib/listening-data";
import { ListeningTrainerClient } from "@/components/exercises/listening-trainer-client";

export const metadata = {
  title: `Hörtrainer – ${APP_NAME}`,
};

export default function ListeningTrainerPage() {
  return <ListeningTrainerClient tasks={listeningTasks} />;
}
