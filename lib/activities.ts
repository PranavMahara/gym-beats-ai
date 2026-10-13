export const ACTIVITIES = [
    { value: "running", label: "Running" },
    { value: "cycling", label: "Cycling" },
    { value: "gymWorkouts", label: "Gym Workouts" },
    { value: "yogaStretching", label: "Yoga & Stretching" },
    { value: "sports", label: "Sports" },
    { value: "dance", label: "Dance" },
    { value: "martialArts", label: "Martial Arts" },
    { value: "hikingWalking", label: "Hiking & Walking" },
    { value: "waterActivities", label: "Water Activities" },
    { value: "winterSports", label: "Winter Sports" },
    { value: "climbing", label: "Climbing" },
    { value: "miscellaneous", label: "Miscellaneous" },
] as const;

export const activityLabel = (value: string) =>
    ACTIVITIES.find((a) => a.value === value)?.label ?? value;

export const spotifySearchUrl = (song: string, artist: string) =>
    `https://open.spotify.com/search/${encodeURIComponent(`${song} ${artist}`)}`;
