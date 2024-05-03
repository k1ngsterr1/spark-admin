import { AppProvider } from "@shared/lib/contexts/AppContext";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

import "../src/shared/styles/global.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function RootLayout({
  children,
  title = "Default Title", // Default title if none provided
  description = "Default description", // Default description if none provided
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <html>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="./public/favicon.svg" />
      </Head>
      <body>
        <AppProvider>
          <ThemeProvider attribute="class" enableSystem={true}>
            <div>{children}</div>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
