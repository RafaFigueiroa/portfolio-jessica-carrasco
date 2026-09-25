import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jessica Carrasco — artista visual e escritora",
  description:
    "Portfólio de Jessica Carrasco, artista visual, escritora e professora de arte chilena radicada no Canadá.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
