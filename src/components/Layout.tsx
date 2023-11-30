import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Logo } from "@/components/Logo";

interface LayoutProps {
  children: ReactNode;
  footerContent?: ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export function Layout(props: LayoutProps) {
  const { children, footerContent } = props;

  return (
    <main className={`bg-base-300 min-h-screen flex flex-col item-center ${inter.className}`}>
      <div className="flex-grow">
        {children}
      </div>
      <footer className="footer bg-secondary p-4 grid-rows-1 grid-cols-2">
        <div>
          {footerContent && footerContent}
        </div>
        <div className="flex justify-end w-full">
          <Logo />
        </div>
      </footer>
    </main>
  );
}
