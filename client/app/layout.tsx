export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className="bg-c8">
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
