import Cart from "@/components/Cart/Cart";
import { StyleProvider } from "@/lib/providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
          <StyleProvider>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: "var(--font-inter)",
                },
              }}
            >
              {children}
              <Cart />
            </ConfigProvider>
          </StyleProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
