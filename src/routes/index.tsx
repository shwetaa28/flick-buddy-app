import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GENRES, MOODS, MOVIES, recommend, type Movie } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlickPick — Movie Recommendation Engine" },
      { name: "description", content: "Tell us what you like — genres, mood, era — and FlickPick recommends movies worth your time." },
      { property: "og:title", content: "FlickPick — Movie Recommendation Engine" },
      { property: "og:description", content: "Pick your genres and mood, get movies you'll actually enjoy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const ERAS = [
  { id: "any", label: "Any era" },
  { id: "classic", label: "Before 2000" },
  { id: "modern", label: "2000 and later" },
];

function toggle(list: string[], item: string) {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Index() {
  const [genres, setGenres] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [era, setEra] = useState("any");
  const [results, setResults] = useState<Movie[] | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("flickpick-saved") ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("flickpick-saved", JSON.stringify(saved));
  }, [saved]);

  const toggleSave = (title: string) => setSaved((s) => toggle(s, title));

  function handleSurprise() {
    const shuffled = [...MOVIES].sort(() => Math.random() - 0.5).slice(0, 6);
    setResults(shuffled);
    setResultKey((k) => k + 1);
  }

  const canSubmit = genres.length > 0;

  function handleRecommend() {
    if (genres.length === 0 && moods.length === 0) {
      setResults(MOVIES.slice().sort((a, b) => b.rating - a.rating).slice(0, 6));
    } else {
      setResults(recommend(genres, moods, era));
    }
    setResultKey((k) => k + 1);
  }

  function handleReset() {
    setGenres([]);
    setMoods([]);
    setEra("any");
    setResults(null);
  }

  const chipBase =
    "rounded-full border px-4 py-1.5 text-sm transition-all duration-200 active:scale-95 cursor-pointer";
  const chipOn = `${chipBase} border-transparent bg-primary font-medium text-primary-foreground shadow-sm`;
  const chipOff = `${chipBase} border-input bg-card text-foreground hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent hover:shadow-sm`;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
        <header className="mb-10">
          <p className="text-sm font-medium tracking-widest text-primary uppercase">FlickPick</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What should you watch tonight?
          </h1>
          <p className="mt-3 text-muted-foreground">
            Pick a few things you like and we'll recommend movies from our collection of {MOVIES.length} hand-picked titles.
          </p>
        </header>

        <section className="space-y-8">
          <div>
            <h2 className="mb-3 text-sm font-semibold">1. Favorite genres</h2>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenres(toggle(genres, g))}
                  className={genres.includes(g) ? chipOn : chipOff}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold">2. What mood are you in? <span className="font-normal text-muted-foreground">(optional)</span></h2>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMoods(toggle(moods, m))}
                  className={moods.includes(m) ? chipOn : chipOff}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold">3. Era</h2>
            <div className="flex flex-wrap gap-2">
              {ERAS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setEra(e.id)}
                  className={era === e.id ? chipOn : chipOff}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleRecommend}
              disabled={!canSubmit}
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Recommend movies
            </button>
            {results && (
              <button
                onClick={handleReset}
                className="rounded-md border border-input px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                Start over
              </button>
            )}
          </div>
        </section>

        {results && (
          <section className="mt-14">
            <h2 className="mb-5 text-xl font-bold tracking-tight">Your recommendations</h2>
            {results.length === 0 ? (
              <p className="text-muted-foreground">No matches found — try picking different genres.</p>
            ) : (
              <ol className="space-y-4">
                {results.map((m, i) => (
                  <li key={m.title} className="rounded-lg border border-border bg-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">
                          <span className="mr-2 text-muted-foreground">{i + 1}.</span>
                          {m.title} <span className="font-normal text-muted-foreground">({m.year})</span>
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {m.genres.join(", ")} · {m.duration}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                        ★ {m.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-card-foreground/80">{m.plot}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        )}

        <footer className="mt-16 border-t border-border pt-6 text-xs text-muted-foreground">
          A simple rule-based recommendation engine — scores each movie by genre match, mood match, era, and rating.
        </footer>
      </div>
    </main>
  );
}
