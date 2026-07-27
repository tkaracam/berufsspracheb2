import { APP_NAME } from "@/lib/constants";
import { ImportManager } from "@/components/admin/import-manager";

export const metadata = {
  title: `Import – ${APP_NAME}`,
};

export default function ImportPage() {
  return <ImportManager />;
}
