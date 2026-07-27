import { NextResponse } from "next/server";
import { Document, Page, Text, View, StyleSheet, renderToStream } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 12, fontFamily: "Helvetica-Bold" },
  subtitle: { fontSize: 12, marginBottom: 20, color: "#555" },
  row: { flexDirection: "row", borderBottom: "1 solid #ddd", paddingVertical: 6 },
  cellPhrase: { width: "35%", fontFamily: "Helvetica-Bold" },
  cellSynonym: { width: "30%", color: "#333" },
  cellSatz: { width: "35%", color: "#555", fontStyle: "italic" },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "nomen_verb";

  const supabase = await createClient();

  let rows: { phrase?: string; begriff?: string; artikel?: string; synonym?: string | null; beispielsatz?: string | null }[] = [];
  let title = "";

  if (type === "nomen_verb") {
    const { data } = await supabase
      .from("nomen_verb_verbindungen")
      .select("phrase, synonym, beispielsatz")
      .limit(30);
    rows = data ?? [];
    title = "Nomen-Verb-Verbindungen – Arbeitsblatt";
  } else {
    const { data } = await supabase
      .from("fachwoerter")
      .select("begriff, artikel, synonym, beispielsatz")
      .limit(30);
    rows = data ?? [];
    title = "Fachwortschatz – Arbeitsblatt";
  }

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          Berufssprache B2 – Übungsblatt für den Unterricht
        </Text>
        {rows.map((row, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.cellPhrase}>
              {row.phrase ?? `${row.artikel} ${row.begriff}`}
            </Text>
            <Text style={styles.cellSynonym}>{row.synonym}</Text>
            <Text style={styles.cellSatz}>{row.beispielsatz}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  const stream = await renderToStream(MyDocument);
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="arbeitsblatt-${type}.pdf"`,
    },
  });
}
