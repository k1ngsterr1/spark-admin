import { AppProvider } from "@shared/lib/contexts/AppContext";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Head from "next/head";

import "@shared/styles/global.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AuthProvider } from "@widgets/Contexts/AuthContext";

export default async function RootLayout({
  children,
  title = "Spark Admin", // Default title if none provided
  description = "Spark Admin", // Default description if none provided
  params: { locale },
}: {
  children: React.ReactNode;
  title?: string;
  params: { locale: string };
  description?: string;
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="./public/favicon.svg" />
      </Head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <ThemeProvider attribute="class" enableSystem={true}>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
