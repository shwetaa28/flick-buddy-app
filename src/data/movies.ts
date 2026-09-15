export interface Movie {
  title: string;
  year: number;
  genres: string[];
  mood: string[];
  rating: number;
  duration: string;
  plot: string;
}

export const MOVIES: Movie[] = [
  { title: "The Shawshank Redemption", year: 1994, genres: ["Drama"], mood: ["Uplifting", "Thoughtful"], rating: 9.3, duration: "2h 22m", plot: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency." },
  { title: "The Dark Knight", year: 2008, genres: ["Action", "Crime"], mood: ["Intense", "Thrilling"], rating: 9.0, duration: "2h 32m", plot: "Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy." },
  { title: "Inception", year: 2010, genres: ["Sci-Fi", "Action"], mood: ["Mind-bending", "Intense"], rating: 8.8, duration: "2h 28m", plot: "A thief who steals secrets from dreams is given a chance to erase his criminal history." },
  { title: "Interstellar", year: 2014, genres: ["Sci-Fi", "Drama"], mood: ["Thoughtful", "Emotional"], rating: 8.7, duration: "2h 49m", plot: "Explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { title: "Forrest Gump", year: 1994, genres: ["Drama", "Romance"], mood: ["Uplifting", "Emotional"], rating: 8.8, duration: "2h 22m", plot: "The life story of a slow-witted but kind-hearted man from Alabama." },
  { title: "Pulp Fiction", year: 1994, genres: ["Crime", "Drama"], mood: ["Thrilling", "Mind-bending"], rating: 8.9, duration: "2h 34m", plot: "The lives of two mob hitmen, a boxer and a gangster's wife intertwine in four tales." },
  { title: "The Godfather", year: 1972, genres: ["Crime", "Drama"], mood: ["Intense", "Thoughtful"], rating: 9.2, duration: "2h 55m", plot: "The aging patriarch of a crime dynasty transfers control to his reluctant son." },
  { title: "Spirited Away", year: 2001, genres: ["Animation", "Fantasy"], mood: ["Whimsical", "Uplifting"], rating: 8.6, duration: "2h 5m", plot: "A girl wanders into a world ruled by gods, witches and spirits." },
  { title: "Parasite", year: 2019, genres: ["Thriller", "Drama"], mood: ["Intense", "Thoughtful"], rating: 8.5, duration: "2h 12m", plot: "A poor family schemes to become employed by a wealthy household." },
  { title: "The Grand Budapest Hotel", year: 2014, genres: ["Comedy", "Drama"], mood: ["Whimsical", "Light-hearted"], rating: 8.1, duration: "1h 39m", plot: "A legendary concierge and his protégé become entangled in a battle over a family fortune." },
  { title: "La La Land", year: 2016, genres: ["Romance", "Musical"], mood: ["Uplifting", "Emotional"], rating: 8.0, duration: "2h 8m", plot: "An aspiring actress and a jazz musician chase their dreams in Los Angeles." },
  { title: "Get Out", year: 2017, genres: ["Horror", "Thriller"], mood: ["Intense", "Thrilling"], rating: 7.8, duration: "1h 44m", plot: "A young Black man uncovers a disturbing secret when he meets his girlfriend's family." },
  { title: "Whiplash", year: 2014, genres: ["Drama", "Musical"], mood: ["Intense", "Emotional"], rating: 8.5, duration: "1h 46m", plot: "A young drummer enrolls at a music conservatory under a ruthless instructor." },
  { title: "The Matrix", year: 1999, genres: ["Sci-Fi", "Action"], mood: ["Mind-bending", "Thrilling"], rating: 8.7, duration: "2h 16m", plot: "A hacker discovers the world he lives in is a simulated reality." },
  { title: "Toy Story", year: 1995, genres: ["Animation", "Comedy"], mood: ["Light-hearted", "Whimsical"], rating: 8.3, duration: "1h 21m", plot: "A cowboy doll feels threatened when a new spaceman action figure becomes the favorite." },
  { title: "Fight Club", year: 1999, genres: ["Drama", "Thriller"], mood: ["Mind-bending", "Intense"], rating: 8.8, duration: "2h 19m", plot: "An insomniac office worker forms an underground fight club with a soap salesman." },
  { title: "The Silence of the Lambs", year: 1991, genres: ["Horror", "Thriller"], mood: ["Intense", "Thrilling"], rating: 8.6, duration: "1h 58m", plot: "A young FBI cadet seeks help from an imprisoned cannibal to catch a serial killer." },
  { title: "Amélie", year: 2001, genres: ["Romance", "Comedy"], mood: ["Whimsical", "Uplifting"], rating: 8.3, duration: "2h 2m", plot: "A shy waitress in Paris decides to change the lives of those around her for the better." },
  { title: "Goodfellas", year: 1990, genres: ["Crime", "Drama"], mood: ["Intense", "Thrilling"], rating: 8.7, duration: "2h 26m", plot: "The rise and fall of a mob associate over three decades." },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004, genres: ["Romance", "Sci-Fi"], mood: ["Emotional", "Mind-bending"], rating: 8.3, duration: "1h 48m", plot: "A couple undergoes a procedure to erase each other from their memories." },
  { title: "Mad Max: Fury Road", year: 2015, genres: ["Action", "Sci-Fi"], mood: ["Intense", "Thrilling"], rating: 8.1, duration: "2h", plot: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler." },
  { title: "The Lion King", year: 1994, genres: ["Animation", "Drama"], mood: ["Uplifting", "Emotional"], rating: 8.5, duration: "1h 28m", plot: "A young lion prince flees his kingdom after the death of his father." },
  { title: "Joker", year: 2019, genres: ["Drama", "Crime"], mood: ["Intense", "Thoughtful"], rating: 8.4, duration: "2h 2m", plot: "A failed comedian spirals into madness and becomes the criminal Joker." },
  { title: "Blade Runner 2049", year: 2017, genres: ["Sci-Fi", "Thriller"], mood: ["Thoughtful", "Intense"], rating: 8.0, duration: "2h 44m", plot: "A young blade runner uncovers a secret that could plunge society into chaos." },
  { title: "Dead Poets Society", year: 1989, genres: ["Drama"], mood: ["Uplifting", "Thoughtful"], rating: 8.1, duration: "2h 8m", plot: "An English teacher inspires his students through poetry and free thinking." },
  { title: "The Pursuit of Happyness", year: 2006, genres: ["Drama"], mood: ["Uplifting", "Emotional"], rating: 8.0, duration: "1h 57m", plot: "A struggling salesman takes custody of his son as he begins a life-changing internship." },
  { title: "Shutter Island", year: 2010, genres: ["Thriller"], mood: ["Mind-bending", "Intense"], rating: 8.2, duration: "2h 18m", plot: "A U.S. Marshal investigates a disappearance at a hospital for the criminally insane." },
  { title: "Coco", year: 2017, genres: ["Animation", "Musical"], mood: ["Uplifting", "Emotional"], rating: 8.4, duration: "1h 45m", plot: "A boy journeys to the Land of the Dead to unlock his family's history." },
  { title: "A Quiet Place", year: 2018, genres: ["Horror", "Thriller"], mood: ["Intense", "Thrilling"], rating: 7.5, duration: "1h 30m", plot: "A family must live in silence to avoid creatures that hunt by sound." },
  { title: "Dune", year: 2021, genres: ["Sci-Fi", "Action"], mood: ["Intense", "Thoughtful"], rating: 8.0, duration: "2h 35m", plot: "A noble family becomes embroiled in a war for control over a desert planet's spice." },
  { title: "Everything Everywhere All at Once", year: 2022, genres: ["Action", "Comedy", "Sci-Fi"], mood: ["Mind-bending", "Whimsical"], rating: 7.8, duration: "2h 19m", plot: "A laundromat owner must connect with parallel universe versions of herself." },
  { title: "The Conjuring", year: 2013, genres: ["Horror"], mood: ["Intense", "Thrilling"], rating: 7.5, duration: "1h 52m", plot: "Paranormal investigators help a family terrorized by a dark presence." },
  { title: "Rocky", year: 1976, genres: ["Drama"], mood: ["Uplifting", "Intense"], rating: 8.1, duration: "2h", plot: "A small-time boxer gets a rare chance to fight the heavyweight champion." },
  { title: "The Social Network", year: 2010, genres: ["Drama"], mood: ["Thoughtful", "Intense"], rating: 7.8, duration: "2h", plot: "The story of the founding of Facebook and the lawsuits that followed." },
  { title: "3 Idiots", year: 2009, genres: ["Comedy", "Drama"], mood: ["Uplifting", "Light-hearted"], rating: 8.4, duration: "2h 50m", plot: "Two friends search for their long-lost college companion while recalling their engineering days." },
  { title: "Dangal", year: 2016, genres: ["Drama"], mood: ["Uplifting", "Emotional"], rating: 8.3, duration: "2h 41m", plot: "A former wrestler trains his daughters to become world-class wrestlers." },
];

export const GENRES = ["Action", "Animation", "Comedy", "Crime", "Drama", "Horror", "Musical", "Romance", "Sci-Fi", "Thriller"];
export const MOODS = ["Uplifting", "Intense", "Thoughtful", "Emotional", "Thrilling", "Mind-bending", "Light-hearted", "Whimsical"];

export function recommend(genres: string[], moods: string[], era: string): Movie[] {
  const scored = MOVIES.map((m) => {
    let score = 0;
    score += m.genres.filter((g) => genres.includes(g)).length * 3;
    score += m.mood.filter((mo) => moods.includes(mo)).length * 2;
    if (era === "classic" && m.year < 2000) score += 2;
    if (era === "modern" && m.year >= 2000) score += 2;
    score += m.rating / 10;
    return { movie: m, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((s) => s.movie);
}
