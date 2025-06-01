import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function FooterArea() {
  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "https://x.com/soylentisite", label: "Twitter" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  const menuItems = [
    { label: "Hakkımızda", href: "/soylenti/hakkimizda" },
    { label: "Yazarlar", href: "/soylenti/yazarlar" },
    { label: "Yardım", href: "/soylenti/yardim" },
    { label: "İletişim", href: "/soylenti/iletisim" },
  ];

  const legalLinks = [
    { label: "Gizlilik Politikası", href: "#" },
    { label: "Kullanım Şartları", href: "#" },
    { label: "Çerez Politikası", href: "#" },
    { label: "Aydınlatma Metni", href: "#" },
  ];

  return (
    <footer className="bg-[#ececec] text-black mt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src={"/logo-black.png"}
                alt="Logo"
                className="h-24 w-auto mb-4"
              />
              <p className="text-gray-900 text-sm leading-relaxed max-w-md">
                Güncel haberler, teknoloji, spor, finans ve daha fazlası için
                güvenilir haber kaynağınız.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Hızlı Erişim
            </h4>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-900 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Bizi Takip Edin
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <IconComponent className="text-lg text-gray-300 hover:text-white transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-900 text-sm">
                © 2024{" "}
                <span className="text-gray-900 font-medium">Söylenti</span>. Tüm
                hakları saklıdır.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-900 hover:text-gray-500 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
