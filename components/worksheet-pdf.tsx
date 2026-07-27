"use client";

import { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 10,
    color: "#555",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
  },
  item: {
    marginBottom: 10,
  },
  task: {
    marginBottom: 4,
  },
  blank: {
    borderBottom: "1px solid #000",
    width: 180,
    marginBottom: -2,
  },
  answer: {
    color: "#2563eb",
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 9,
    color: "#888",
    textAlign: "center",
  },
});

export type WorksheetItem = {
  id: string;
  question: string;
  answer: string;
  type: "nomen-verb" | "fachwort" | "lueckentext";
};

function WorksheetDocument({
  title,
  items,
  includeAnswers,
}: {
  title: string;
  items: WorksheetItem[];
  includeAnswers: boolean;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          Berufssprache B2 – Arbeitsblatt
        </Text>

        {items.map((item, i) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.task}>
              {i + 1}. {item.question}
            </Text>
            {includeAnswers && (
              <Text style={styles.answer}>Lösung: {item.answer}</Text>
            )}
          </View>
        ))}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Seite ${pageNumber} von ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

interface Props {
  title: string;
  items: WorksheetItem[];
  includeAnswers: boolean;
}

export function WorksheetDownloadButton({ title, items, includeAnswers }: Props) {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const blob = await pdf(
        <WorksheetDocument
          title={title}
          items={items}
          includeAnswers={includeAnswers}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={download} disabled={loading || items.length === 0}>
      <FileDown className="mr-2 h-4 w-4" />
      {loading ? "PDF wird erstellt ..." : "PDF herunterladen"}
    </Button>
  );
}
