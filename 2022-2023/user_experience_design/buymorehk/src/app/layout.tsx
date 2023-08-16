import { Container, ThemeProvider } from "@/components/@mui/material";
import Header from "@/components/Header";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Theme from "@/components/Theme";
import Footer from "@/components/Footer";

export const metadata = {
  title: "未來科技 - 訂購電腦最快即日送到",
  description: "訂購電腦最快即日送到",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <ThemeProvider theme={Theme}>
        <body>
          <Container
            maxWidth="md"
            disableGutters
            sx={{
              backgroundColor: "#fff",
              minHeight: "100vh",
            }}
          >
            <Header />
            <Navigation />
            {children}
            <Footer />
          </Container>
        </body>
      </ThemeProvider>
    </html>
  );
}
