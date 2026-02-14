import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
});

export const metadata = {
  title: "Find Recipes",
  description:
    "This is a coding challenge for Medavie. It fetches recipes from the Spoonacular API and displays them on the page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${sourceSans3.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
