import Faq from "@/components/Faq";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import TagLine from "@/components/TagLine";
import Technology from "@/components/Technology";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  console.warn(
    "%cWARNING!%c Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.",
    "font-size: 26px; font-weight: bold; color: #FF4C00;",
    "font-size: 18px; color: #4A90E2;"
  );
  return (
    <>
      <Navbar />
      <TagLine />
      <Services />
      <Technology />
      <Faq />
      <ContactUs />
      <Footer />
    </>
  );
}
