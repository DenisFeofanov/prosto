import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "ПРОСТО",
  description: "Доставка цветов и букетов в Нижнем Тагиле",
};

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["cyrillic"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "var(--font-inter)",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
