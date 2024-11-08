import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 p-10">
    <div className="container mx-auto flex flex-wrap justify-between items-center space-y-6 md:space-y-0">
      <div className="flex flex-col items-start">
        <Image src="/assets/images/logo_dw.png" alt="logo" width={118} height={118} className="object-contain" />
        <p className="mt-4 text-sm">DreamWheels 2024</p>
      </div>
      <div className="flex flex-wrap gap-10">
        {footerLinks.map((item) => (
          <div key={item.title} className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <div className="flex flex-col space-y-1">
              {item.links.map((link) => (
                <Link key={link.title} href={link.url} className="text-sm text-gray-400 hover:text-white">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-10 border-t border-gray-700 pt-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <p className="text-sm">&copy; 2024 DreamWheels. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">
            Privacy & Policy
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-white">
            Terms & Condition
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
