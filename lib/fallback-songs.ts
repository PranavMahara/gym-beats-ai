// Built-in song library, used when the AI is unavailable.
// Each entry is [song, artist, intensity].

type Intensity = "low" | "medium" | "high";
type Entry = [song: string, artist: string, intensity: Intensity];

const LIBRARY: Record<string, Entry[]> = {
    rock: [
        ["Thunderstruck", "AC/DC", "high"],
        ["Back in Black", "AC/DC", "high"],
        ["Enter Sandman", "Metallica", "high"],
        ["Killing in the Name", "Rage Against the Machine", "high"],
        ["Bulls on Parade", "Rage Against the Machine", "high"],
        ["Break Stuff", "Limp Bizkit", "high"],
        ["Du Hast", "Rammstein", "high"],
        ["Duality", "Slipknot", "high"],
        ["Smells Like Teen Spirit", "Nirvana", "high"],
        ["Welcome to the Jungle", "Guns N' Roses", "high"],
        ["Down with the Sickness", "Disturbed", "high"],
        ["Eye of the Tiger", "Survivor", "medium"],
        ["We Will Rock You", "Queen", "medium"],
        ["Seven Nation Army", "The White Stripes", "medium"],
        ["Livin' on a Prayer", "Bon Jovi", "medium"],
        ["Don't Stop Believin'", "Journey", "medium"],
        ["Mr. Brightside", "The Killers", "medium"],
        ["Song 2", "Blur", "medium"],
        ["Highway to Hell", "AC/DC", "medium"],
        ["Whole Lotta Love", "Led Zeppelin", "medium"],
        ["Sweet Child o' Mine", "Guns N' Roses", "medium"],
        ["Everlong", "Foo Fighters", "medium"],
        ["Wonderwall", "Oasis", "low"],
        ["Hotel California", "Eagles", "low"],
        ["Wish You Were Here", "Pink Floyd", "low"],
        ["Under the Bridge", "Red Hot Chili Peppers", "low"],
        ["Fix You", "Coldplay", "low"],
        ["Dream On", "Aerosmith", "low"],
    ],
    hiphop: [
        ["Lose Yourself", "Eminem", "high"],
        ["Till I Collapse", "Eminem", "high"],
        ["Power", "Kanye West", "high"],
        ["Stronger", "Kanye West", "high"],
        ["Can't Hold Us", "Macklemore & Ryan Lewis", "high"],
        ["HUMBLE.", "Kendrick Lamar", "high"],
        ["SICKO MODE", "Travis Scott", "high"],
        ["Goosebumps", "Travis Scott", "high"],
        ["Mask Off", "Future", "high"],
        ["Started from the Bottom", "Drake", "high"],
        ["In da Club", "50 Cent", "medium"],
        ["Empire State of Mind", "Jay-Z", "medium"],
        ["Run This Town", "Jay-Z", "medium"],
        ["Gold Digger", "Kanye West", "medium"],
        ["California Love", "2Pac", "medium"],
        ["Juicy", "The Notorious B.I.G.", "medium"],
        ["Hey Ya!", "OutKast", "medium"],
        ["Black and Yellow", "Wiz Khalifa", "medium"],
        ["Hotline Bling", "Drake", "medium"],
        ["Alright", "Kendrick Lamar", "medium"],
        ["Sunflower", "Post Malone", "low"],
        ["Passionfruit", "Drake", "low"],
        ["Love Yourz", "J. Cole", "low"],
        ["Redbone", "Childish Gambino", "low"],
    ],
    rap: [
        ["Rap God", "Eminem", "high"],
        ["Not Afraid", "Eminem", "high"],
        ["DNA.", "Kendrick Lamar", "high"],
        ["Mama Said Knock You Out", "LL Cool J", "high"],
        ["Jump Around", "House of Pain", "high"],
        ["Bodak Yellow", "Cardi B", "high"],
        ["Rockstar", "DaBaby", "high"],
        ["Mo Bamba", "Sheck Wes", "high"],
        ["Straight Outta Compton", "N.W.A", "high"],
        ["The Next Episode", "Dr. Dre", "high"],
        ["Still D.R.E.", "Dr. Dre", "medium"],
        ["Forgot About Dre", "Dr. Dre", "medium"],
        ["N.Y. State of Mind", "Nas", "medium"],
        ["Middle Child", "J. Cole", "medium"],
        ["Gangsta's Paradise", "Coolio", "medium"],
        ["Ms. Jackson", "OutKast", "medium"],
        ["Dear Mama", "2Pac", "low"],
        ["The Message", "Grandmaster Flash & The Furious Five", "low"],
        ["Changes", "2Pac", "low"],
        ["Stan", "Eminem", "low"],
    ],
    edm: [
        ["Levels", "Avicii", "high"],
        ["Titanium", "David Guetta ft. Sia", "high"],
        ["Animals", "Martin Garrix", "high"],
        ["Don't You Worry Child", "Swedish House Mafia", "high"],
        ["Clarity", "Zedd", "high"],
        ["Bangarang", "Skrillex", "high"],
        ["Scary Monsters and Nice Sprites", "Skrillex", "high"],
        ["Language", "Porter Robinson", "high"],
        ["Strobe", "deadmau5", "high"],
        ["Satisfaction", "Benny Benassi", "high"],
        ["Harder, Better, Faster, Stronger", "Daft Punk", "high"],
        ["Turn Down for What", "DJ Snake & Lil Jon", "high"],
        ["Sandstorm", "Darude", "high"],
        ["Faded", "Alan Walker", "medium"],
        ["Wake Me Up", "Avicii", "medium"],
        ["Lean On", "Major Lazer & DJ Snake", "medium"],
        ["Feel So Close", "Calvin Harris", "medium"],
        ["This Is What You Came For", "Calvin Harris", "medium"],
        ["One More Time", "Daft Punk", "medium"],
        ["Stay", "Zedd & Alessia Cara", "medium"],
        ["Summer", "Calvin Harris", "medium"],
        ["Midnight City", "M83", "medium"],
        ["Opus", "Eric Prydz", "medium"],
        ["Something About Us", "Daft Punk", "low"],
        ["Innerbloom", "RÜFÜS DU SOL", "low"],
        ["Adagio for Strings", "Tiësto", "low"],
    ],
};

const GENRE_ALIASES: Record<string, string[]> = {
    rock: ["rock", "metal", "punk", "grunge", "alternative", "indie"],
    hiphop: ["hip-hop", "hip hop", "hiphop", "r&b", "pop rap"],
    rap: ["rap", "trap", "drill"],
    edm: ["edm", "electronic", "house", "techno", "dance", "trance", "dubstep", "electro"],
};

const RANK: Record<Intensity, number> = { low: 0, medium: 1, high: 2 };

const shuffle = <T,>(items: T[]) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

// Which library genres match the user's free-text genres. Falls back to all of them.
const matchGenres = (genres?: string) => {
    const text = (genres || "").toLowerCase();
    const matched = Object.keys(LIBRARY).filter((genre) =>
        GENRE_ALIASES[genre].some((alias) => text.includes(alias))
    );
    return matched.length ? matched : Object.keys(LIBRARY);
};

export const pickFallbackSongs = ({
    genres,
    artists,
    intensity,
    count,
}: {
    genres?: string;
    artists?: string;
    intensity: Intensity;
    count: number;
}) => {
    const favourites = (artists || "")
        .toLowerCase()
        .split(/[,/&]+/)
        .map((a) => a.trim())
        .filter((a) => a.length > 2);

    // Per genre: favourite artists first, then closest intensity, shuffled within ties.
    const queues = matchGenres(genres).map((genre) =>
        shuffle(LIBRARY[genre])
            .map((entry) => ({
                entry,
                score:
                    Math.abs(RANK[entry[2]] - RANK[intensity]) -
                    (favourites.some((f) => entry[1].toLowerCase().includes(f)) ? 1 : 0),
            }))
            .sort((a, b) => a.score - b.score)
            .map((x) => x.entry)
    );

    // Round-robin across the chosen genres so a mix of genres gets a mix of songs.
    const songs: { song: string; artist: string }[] = [];
    const seen = new Set<string>();
    for (let i = 0; songs.length < count && queues.some((q) => i < q.length); i++) {
        for (const queue of queues) {
            const entry = queue[i];
            if (!entry || songs.length >= count) continue;
            const key = `${entry[0]}|${entry[1]}`;
            if (seen.has(key)) continue;
            seen.add(key);
            songs.push({ song: entry[0], artist: entry[1] });
        }
    }
    return songs;
};
