import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ArtistPhilosophy } from "@/components/ArtistPhilosophy";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { FlashCatalog } from "@/components/FlashCatalog";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { BookingRequestForm } from "@/components/BookingRequestForm";
import { AftercareProtocol } from "@/components/AftercareProtocol";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"New Tattoos by Jake Llewellyn\",\"description\":\"New Tattoos by Jake Llewellyn\",\"url\":\"https://new-tattoos-by-jake-llewellyn-dd8a8a.duckbyte.co\"}" }} />
      <Navbar />
      <div id="hero-section" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <HeroSection />
        </Suspense>
      </div>
      <div id="artist-philosophy" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <ArtistPhilosophy />
        </Suspense>
      </div>
      <div id="portfolio-grid" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <PortfolioGrid />
        </Suspense>
      </div>
      <div id="flash-catalog" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <FlashCatalog />
        </Suspense>
      </div>
      <div id="process-timeline" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <ProcessTimeline />
        </Suspense>
      </div>
      <div id="booking-request-form" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <BookingRequestForm />
        </Suspense>
      </div>
      <div id="aftercare-protocol" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <AftercareProtocol />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
