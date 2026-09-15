import { createFileRoute } from "@tanstack/react-router";
import { Clapperboard, Heart, RotateCcw, Shuffle, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import cinemaCollage from "@/assets/cinema-collage.jpg";
import { Button } from "@/components/ui/button";
import { GENRES, MOODS, MOVIES, recommend, type Movie } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlickPick — Find Your Next Movie" },
      { name: "description", content: "Choose your genres, mood, and era to get instant movie recommendations from FlickPick." },
      { property: "og:title", content: "FlickPick — Find Your Next Movie" },
      { property: "og:description", content: "A colorful, simple movie recommendation engine based on what you enjoy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const ERAS = [
  { id: "any", label: "Any era" },
  { id: "classic", label: "Before 2000" },
  { id: "modern", label: "2000 onwards" },
];

const MOOD_ICONS: Record<string, string> = {
  Uplifting: "☀️", Intense: "⚡", Thoughtful: "💭", Emotional: "💙",
  Thrilling: "🔥", "Mind-bending": "🌀", "Light-hearted": "🌈", Whimsical: "✨",
};

function toggle(list: string[], item: string) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item];
}

function Index() {
  const [genres, setGenres] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [era, setEra] = useState("any");
  const [results, setResults] = useState<Movie[] | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem("flickpick-saved") ?? "[]"));
    } catch {
      setSaved([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("flickpick-saved", JSON.stringify(saved));
  }, [saved]);

  const toggleSave = (title: string) => setSaved((current) => toggle(current, title));

  function showResults(next: Movie[]) {
    setResults(next);
    setResultKey((key) => key + 1);
    window.setTimeout(() => document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" }), 80);
  }

  function handleSurprise() {
    showResults([...MOVIES].sort(() => Math.random() - 0.5).slice(0, 6));
  }

  function handleRecommend() {
    const next = genres.length === 0 && moods.length === 0
      ? [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 6)
      : recommend(genres, moods, era);
    showResults(next);
  }

  function handleReset() {
    setGenres([]);
    setMoods([]);
    setEra("any");
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selectionCount = genres.length + moods.length + (era === "any" ? 0 : 1);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-prism">
              <Clapperboard className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-3xl leading-none text-primary">FLICKPICK</p>
              <p className="text-xs font-semibold text-muted-foreground">Find your next favorite</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold shadow-soft">
            <Heart className="size-4 fill-coral text-coral" aria-hidden="true" />
            <span>{saved.length}</span><span className="hidden text-muted-foreground sm:inline">saved</span>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-12" aria-labelledby="page-title">
          <div className="relative min-h-72 overflow-hidden rounded-3xl lg:col-span-7 lg:min-h-96">
            <img src={cinemaCollage} alt="Film reels and colorful cinematic scenes" width={1440} height={700} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-hero-wash p-6 pt-24 sm:p-8 sm:pt-32">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold uppercase text-primary shadow-soft">
                <Sparkles className="size-3.5 text-coral" aria-hidden="true" /> Tonight’s watch
              </span>
              <h1 id="page-title" className="font-display max-w-2xl text-5xl leading-[0.9] text-primary sm:text-7xl">
                WHAT SHOULD YOU WATCH?
              </h1>
              <p className="mt-3 max-w-lg text-sm font-medium text-foreground/75 sm:text-base">
                Pick what feels right. We’ll score {MOVIES.length} hand-picked movies and find your strongest matches.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-prism lg:col-span-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-primary-foreground/70">Quick match</p>
                <h2 className="font-display mt-1 text-4xl leading-none">YOUR MOVIE MIX</h2>
              </div>
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15 font-display text-3xl">
                {selectionCount}
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
              Choose at least one genre, then add a mood and era to sharpen the results.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div className="rounded-2xl bg-primary-foreground/10 p-3"><span className="block font-display text-2xl">{genres.length}</span>Genres</div>
              <div className="rounded-2xl bg-primary-foreground/10 p-3"><span className="block font-display text-2xl">{moods.length}</span>Moods</div>
              <div className="rounded-2xl bg-primary-foreground/10 p-3"><span className="block font-display text-2xl">{era === "any" ? "All" : "1"}</span>Era</div>
            </div>
            <Button onClick={handleSurprise} variant="secondary" className="mt-5 h-12 w-full rounded-2xl font-bold active:scale-[0.98]">
              <Shuffle aria-hidden="true" /> Surprise me
            </Button>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 shadow-soft lg:col-span-7 sm:p-7">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="step-label">Step 01</p><h2 className="font-display text-3xl text-primary">PICK YOUR GENRES</h2></div>
              <span className="text-xs font-semibold text-muted-foreground">Choose one or more</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {GENRES.map((genre) => {
                const active = genres.includes(genre);
                return (
                  <Button key={genre} variant={active ? "default" : "outline"} aria-pressed={active} onClick={() => setGenres(toggle(genres, genre))}
                    className="h-12 rounded-2xl font-bold transition-all hover:-translate-y-0.5 active:translate-y-0">
                    {genre}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-aqua p-5 text-aqua-foreground shadow-soft lg:col-span-5 sm:p-7">
            <p className="text-xs font-bold uppercase text-aqua-foreground/60">Step 03</p>
            <h2 className="font-display text-3xl">CHOOSE AN ERA</h2>
            <div className="mt-5 grid gap-2">
              {ERAS.map((option) => {
                const active = era === option.id;
                return (
                  <Button key={option.id} variant="ghost" aria-pressed={active} onClick={() => setEra(option.id)}
                    className={`h-12 justify-between rounded-2xl px-4 font-bold ${active ? "bg-card text-primary shadow-soft hover:bg-card" : "text-aqua-foreground hover:bg-card/40"}`}>
                    {option.label}<span className={`size-3 rounded-full border-2 ${active ? "border-primary bg-primary" : "border-aqua-foreground/35"}`} />
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-mist p-5 lg:col-span-8 sm:p-7">
            <div className="mb-5"><p className="step-label">Step 02</p><h2 className="font-display text-3xl text-primary">MATCH YOUR MOOD</h2></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {MOODS.map((mood) => {
                const active = moods.includes(mood);
                return (
                  <Button key={mood} variant="ghost" aria-pressed={active} onClick={() => setMoods(toggle(moods, mood))}
                    className={`h-auto min-h-20 flex-col items-start rounded-2xl p-3 text-left transition-all hover:-translate-y-0.5 ${active ? "bg-primary text-primary-foreground shadow-prism hover:bg-primary" : "bg-card text-foreground shadow-soft hover:bg-card"}`}>
                    <span className="text-xl" aria-hidden="true">{MOOD_ICONS[mood]}</span><span className="whitespace-normal font-bold leading-tight">{mood}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-coral p-6 text-coral-foreground shadow-prism lg:col-span-4 sm:p-8">
            <div>
              <Sparkles className="size-8" aria-hidden="true" />
              <h2 className="font-display mt-4 text-4xl leading-none">READY FOR YOUR LINEUP?</h2>
              <p className="mt-3 text-sm font-semibold text-coral-foreground/75">Your choices create a simple match score—no AI, no mystery.</p>
            </div>
            <Button onClick={handleRecommend} disabled={genres.length === 0} className="mt-7 h-14 rounded-2xl bg-card text-primary shadow-soft hover:bg-card/90 active:scale-[0.98]">
              <Clapperboard aria-hidden="true" /> Recommend movies
            </Button>
          </div>
        </section>

        {results && (
          <section id="recommendations" className="scroll-mt-6 py-14" aria-live="polite">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div><p className="step-label">Fresh picks</p><h2 className="font-display text-5xl text-primary">YOUR RECOMMENDATIONS</h2></div>
              <Button onClick={handleReset} variant="outline" className="h-10 rounded-xl"><RotateCcw aria-hidden="true" /> Start over</Button>
            </div>
            {results.length === 0 ? (
              <div className="rounded-3xl bg-mist p-8 text-center font-semibold text-muted-foreground">No close matches—try another genre or mood.</div>
            ) : (
              <ol key={resultKey} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.map((movie, index) => {
                  const isSaved = saved.includes(movie.title);
                  return (
                    <li key={movie.title} className="animate-result-in group flex min-h-72 flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-prism" style={{ animationDelay: `${index * 75}ms` }}>
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-display text-5xl leading-none text-aqua/50">{String(index + 1).padStart(2, "0")}</span>
                        <Button size="icon" variant="ghost" onClick={() => toggleSave(movie.title)} aria-label={isSaved ? `Remove ${movie.title} from watchlist` : `Save ${movie.title} to watchlist`} className="rounded-full hover:bg-coral-soft">
                          <Heart className={isSaved ? "fill-coral text-coral" : "text-muted-foreground"} aria-hidden="true" />
                        </Button>
                      </div>
                      <h3 className="font-display mt-4 text-3xl leading-none text-primary">{movie.title}</h3>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <span>{movie.year}</span><span>•</span><span>{movie.duration}</span>
                        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-gold-soft px-2.5 py-1 text-gold-foreground"><Star className="size-3 fill-current" />{movie.rating.toFixed(1)}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1.5">{movie.genres.map((genre) => <span key={genre} className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold text-primary">{genre}</span>)}</div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{movie.plot}</p>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        )}

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border py-7 text-xs font-medium text-muted-foreground">
          <span>FlickPick · A rule-based movie recommendation engine</span>
          <span>Genre + mood + era + rating</span>
        </footer>
      </div>
    </main>
  );
}