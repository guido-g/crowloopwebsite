import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { RootRedirect } from "./components/layout/RootRedirect";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { CaseStudy } from "./pages/CaseStudy";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Process } from "./pages/Process";
import { Testimonials } from "./pages/Testimonials";
import { Contact } from "./pages/Contact";
import { Impressum } from "./pages/legal/Impressum";
import { Datenschutz } from "./pages/legal/Datenschutz";
import { Haftungsausschluss } from "./pages/legal/Haftungsausschluss";
import { AGB } from "./pages/legal/AGB";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<CaseStudy />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="process" element={<Process />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="impressum" element={<Impressum />} />
          <Route path="datenschutz" element={<Datenschutz />} />
          <Route path="haftungsausschluss" element={<Haftungsausschluss />} />
          <Route path="agb" element={<AGB />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
