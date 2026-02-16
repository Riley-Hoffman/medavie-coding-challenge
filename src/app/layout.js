import { Source_Sans_3 } from "next/font/google";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "../styles/globals.css";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

export const metadata = {
  title: "CookSeek - Find the Perfect Recipe",
  description:
    "This is a coding challenge for Medavie. It fetches recipes from the Spoonacular API and displays them on the page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${sourceSans3.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
