import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";
import ImageSlider from "@/components/ImageSlider";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1D2736] flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/zawwid-black-logo.svg"
              alt="Zawwid Logo"
              width={100}
              height={32}
              className="w-24 h-auto"
            />
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#1D2736]">
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
              <span>Products</span>

            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
              <span>Solutions</span>

            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
              <span>Why Zawwid</span>

            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
              <span>Resources</span>

            </div>
            <div className="cursor-pointer hover:text-gray-600 transition-colors">
              <span>Pricing</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button className="text-[#1D2736] hover:text-gray-600 transition-colors">
              Log In
            </button>
            <button className="text-[#1D2736] hover:text-gray-600 transition-colors">
              Sign Up
            </button>
            <button className="px-5 py-2.5 rounded bg-[#1D2736] text-white hover:bg-[#2d3b4f] transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section Container with Background */}
      <div className="bg-[#1D3428] rounded-br-[50px] rounded-bl-[50px] text-white w-full">
        <main className="w-full max-w-7xl mx-auto px-6 pt-10 pb-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start text-left z-10">
            <p className="text-[#86EFAC] font-medium tracking-widest text-xs uppercase mb-6">
              Empowering Syrian Talent, NGOs & Companies
            </p>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Unlock Potential. <br />
              Provide Opportunity. <br />
              Build the <span className="text-[#86EFAC]">Future.</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
              The first AI-powered platform connecting Syrian talent with local and global opportunities.
              Whether you're an NGO looking for volunteers, a company hiring professionals,
              or a job seeker building your CV—Zawwid provides the bridge to success.
            </p>

            <div className="w-full max-w-md">
              <WaitlistForm />
            </div>

          </div>

          {/* Right Content - Image Slider */}
          <div className="relative h-[500px] w-full hidden lg:block">
            <ImageSlider />
            {/* Gradient Overlay for smooth fade - Updated to match bg-[#1D3428] */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1D3428] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1D3428] to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Logos Section - Full Width Row */}
          <div className="col-span-1 lg:col-span-2 w-full">
            <div className="flex flex-wrap justify-center md:justify-between gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative h-8 w-24 md:w-32">
                  <Image
                    src="https://dev.dondivi.com/wp-content/uploads/2021/11/dummy-LOGO-white.png"
                    alt="Partner Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FF6B6B] rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-10"></div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2025 Zawwid Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#1D2736] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1D2736] transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
