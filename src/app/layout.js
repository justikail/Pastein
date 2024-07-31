import { Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "Pastein - Modern paste tool",
  description: "pastein is a website where you can store text or scripts online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-vs-dark text-slate-100`} id="pastein">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
