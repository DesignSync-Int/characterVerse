import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { FeaturedCharacters } from "@/components/home/featured-characters";
import { RatingCategories } from "@/components/home/rating-categories";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main>
        <Hero />
        <RatingCategories />
        <FeaturedCharacters />
      </main>
      <Footer />
    </div>
  );
}
