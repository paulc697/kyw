import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { navLinks } from "./data";

const header = () => {
  const router = useRouter();

  return (
    <header>
      <div className="flex items-center space-x-5">
        <section className="max-w-screen-md	flex">
          <div className="px-20">
            <a href="tel:0852800343 decoration-sky-100">0852800343</a>
          </div>
          <div>
            <a href="mailto:info@knockadoonyouthweek.com" className="text-sm">
              info@knockadoonyouthweek.com
            </a>
          </div>
        </section>
      </div>
      <nav className="flex-1 justify-between p-5 mx-auto bg-red-600 mb-2 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto max-w-7xl ">
          <Link href="/home">
            <Image
              className="cursor-pointer flex items-center"
              src="/images/kywlogo.png"
              alt="kyw-logo"
              height={70}
              width={70}
            />
          </Link>
          <div>
            <h1 className="text-white self-center text-xl  whitespace-nowrap">
              Knockadoon Youth Week
            </h1>
          </div>

          <div className="hidden md:inline-flex items-center space-x-5">
            {navLinks.map((link, index) => {
              return (
                <ul key={index}>
                  <Link href={link.path}>
                    <li
                      key={index}
                      className={
                        router.pathname === link.path
                          ? "active cursor-pointer"
                          : "text-white cursor-pointer"
                      }
                    >
                      {link.name}
                    </li>
                  </Link>
                </ul>
              );
            })}
          </div>
          <div className="flex items-center space-x-5">
            <a
              href="https://www.idonate.ie/donation_widget/register-donor-anonymous.php?pid=544"
              target="_blank"
            >
              <h3 className="text-white bg-green-600 px-4 py-1 rounded-full cursor-pointer">
                Donate Now
              </h3>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default header;
