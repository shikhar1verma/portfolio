import "@/styles/global.css";

export const metadata = {
  title: "portfolio",
  description: "My portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
