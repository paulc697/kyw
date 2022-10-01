import Header from "./header";
import Footer from "./footer";

import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>

      <Footer />
    </>
  );
}
