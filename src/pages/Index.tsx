
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WeeklyHighlights from "@/components/WeeklyHighlights";
import TrailsPreview from "@/components/TrailsPreview";
import ToolsPreview from "@/components/ToolsPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <WeeklyHighlights />
        <TrailsPreview />
        <ToolsPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
