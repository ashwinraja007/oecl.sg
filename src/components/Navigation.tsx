import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Users, UserCircle, Briefcase, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CountrySelector from "@/components/CountrySelector";
import { getCurrentCountryFromPath } from "@/services/countryDetection";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const loginPortals = [
   {
    title: "Shipsoft Login",
    description: "Internal staff access",
    url: "https://cs.shipsoft.co/freight_forwarding/#/auth/login",
    icon: Briefcase,
  },
  {
    title: "Customer Login",
    description: "Consolidation & cargo management",
    url: "https://consolmate.com/auth/login/2",
    icon: Users,
  },
  {
    title: "Partner Login",
    description: "For agents & business partners",
    url: "https://pp.onlinetracking.co/auth/login/2",
    icon: UserCircle,
  },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const isActive = (path: string) => location.pathname === path;

  const getNavLink = (basePath: string) =>
    currentCountry.code === "SG"
      ? basePath
      : `/${currentCountry.name.toLowerCase()}${basePath}`;

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-md transition-all duration-300 py-[19px] bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link to={getNavLink("/home")}>
              <img
                alt="GGL Logo"
                className="h-10 w-auto cursor-pointer object-fill transition-all duration-300"
                src="/lovable-uploads/80ac017b-3e55-468b-9c72-9730b97cdcb0.png"
              />
            </Link>
            <div className="h-8 w-px bg-gray-500 hidden md:block"></div>
            <a
  href="https://1ge.sg"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit 1 Global Enterprises Website"
>
            <img
              alt="1 Global Enterprises Logo"
              src="/lovable-uploads/a2513c1d-2708-4143-a69b-fa65a1d4d1f2.png"
              className="hidden md:block h-11 w-auto object-contain transition-all duration-300"
            />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={getNavLink("/home")}
              className={`nav-link font-medium text-black hover:text-kargon-red ${
                isActive(getNavLink("/home")) ||
                (currentCountry.code === "SG" && isActive("/"))
                  ? "text-kargon-red"
                  : ""
              }`}
            >
              Home
            </Link>

            {/* INFO Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`font-medium text-black hover:text-kargon-red ${
                    isActive(getNavLink("/about-us")) || isActive("/gallery")
                      ? "text-kargon-red"
                      : ""
                  }`}
                >
                  Info
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-md z-[60]">
                <DropdownMenuItem asChild>
                  <Link
                    to={getNavLink("/about-us")}
                    className="w-full text-left px-2 py-1"
                  >
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={getNavLink("/gallery")}
                    className="w-full text-left px-2 py-1"
                  >
                    Gallery
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to={getNavLink("/services")}
              className={`nav-link font-medium text-black hover:text-kargon-red ${
                isActive(getNavLink("/services")) ? "text-kargon-red" : ""
              }`}
            >
              Services
            </Link>
            <Link
              to={getNavLink("/blogs")}
              className={`nav-link font-medium text-black hover:text-kargon-red ${
                isActive("/blog") ? "text-kargon-red" : ""
              }`}
            >
              Blogs
            </Link>
            <Link
              to={getNavLink("/global-presence")}
              className={`nav-link font-medium text-black hover:text-kargon-red ${
                isActive(getNavLink("/global-presence")) ? "text-kargon-red" : ""
              }`}
            >
              Global Presence
            </Link>
          </nav>

          {/* Country Selector & Quote Button */}
          <div className="hidden md:flex items-center gap-4">
            <CountrySelector />
            <Link to={`${getNavLink("/contact")}#contact-form`}>
              <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white rounded-md">
                Contact / Quote
              </Button>
            </Link>

            {/* Login Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
  variant="outline"
  className="border-kargon-red text-kargon-red hover:bg-kargon-red hover:text-white rounded-md gap-2"
>
<img
  src="/ship.png"
  alt="Login"
  className="w-7 h-7 object-contain shrink-0"
/>
  Login
  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-72 p-2 bg-white border border-gray-100 shadow-xl rounded-xl z-[60]"
              >
                {loginPortals.map((portal) => (
                  <DropdownMenuItem key={portal.title} asChild className="p-0 rounded-lg focus:bg-transparent">
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg group hover:bg-red-50 transition-colors"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-kargon-red/10 text-kargon-red group-hover:bg-kargon-red group-hover:text-white transition-colors shrink-0">
                        <portal.icon className="w-4 h-4" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          {portal.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {portal.description}
                        </span>
                      </span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="text-black" size={24} />
            ) : (
              <Menu className="text-black" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white py-4 shadow-md animate-fade-in border-t z-40">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to={getNavLink("/home")}
                className={`font-medium text-black hover:text-kargon-red ${
                  isActive(getNavLink("/home")) ||
                  (currentCountry.code === "SG" && isActive("/"))
                    ? "text-kargon-red"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>

              {/* INFO Section */}
              <div className="border-t pt-3">
                <span className="text-sm font-semibold text-gray-500 px-1">
                  INFO
                </span>

                <Link
                  to={getNavLink("/about-us")}
                  className={`font-medium text-black hover:text-kargon-red ${
                    isActive(getNavLink("/about-us")) ? "text-kargon-red" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT US
                </Link>

                <Link
                  to={getNavLink("/gallery")}
                  className={`font-medium text-black hover:text-kargon-red ${
                    isActive("/gallery") ? "text-kargon-red" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  GALLERY
                </Link>
              </div>

              <Link
                to={getNavLink("/services")}
                className={`font-medium text-black hover:text-kargon-red ${
                  isActive(getNavLink("/services")) ? "text-kargon-red" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICES
              </Link>
              <Link
                to="/blog"
                className={`font-medium text-black hover:text-kargon-red ${
                  isActive("/blog") ? "text-kargon-red" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                BLOGS
              </Link>
              <Link
                to={getNavLink("/contact")}
                className={`font-medium text-black hover:text-kargon-red ${
                  isActive(getNavLink("/contact")) ? "text-kargon-red" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>

              <CountrySelector />

              <Link
                to={`${getNavLink("/contact")}#contact-form`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white w-full rounded-md mt-4">
                  GET QUOTE
                </Button>
              </Link>

              {/* Login Section */}
              <div className="border-t pt-3">
                <span className="text-sm font-semibold text-gray-500 px-1">
                  LOGIN
                </span>
                <div className="flex flex-col gap-2 mt-2">
                  {loginPortals.map((portal) => (
                    <a
                      key={portal.title}
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-kargon-red/10 text-kargon-red shrink-0">
                        <portal.icon className="w-4 h-4" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          {portal.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {portal.description}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
