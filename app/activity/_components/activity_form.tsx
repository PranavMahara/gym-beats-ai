"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";

import { Source_Code_Pro } from "next/font/google";
import { HoverEffect } from "@/components/ui/card-hover";
import Loading from "@/app/loading";
import { ACTIVITIES } from "@/lib/activities";

const scp_font = Source_Code_Pro({
    weight: "700",
    subsets: []
})

const sidebarNavItems = [
    { title: "Activity" },
    { title: "Music" },
    { title: "Result" }
];

const DURATIONS = ["15", "30", "45", "60", "90", "120"];
const MOODS = ["happy", "energetic", "relaxed", "romantic", "sad"];

const formSchema = z.object({
    activityType: z.string().min(1, { message: "Pick an activity" }),
    duration: z.string().min(1, { message: "Pick a duration" }),
    intensity: z.string().min(1, { message: "Pick an intensity" }),
    languageOfMusic: z.string().max(40).optional(),
    favouriteGenres: z.string().max(100).optional(),
    favouriteArtists: z.string().max(100).optional(),
    mood: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const selectTriggerClass = `bg-[#121212] h-[50px] ring-2 border-none ${scp_font.className}`;
const selectContentClass = "bg-[#121212] border border-gray-400 rounded-lg text-white";
const inputClass = "bg-[#121212] h-[50px] ring-2 border-none";

const Step = ({ children }: { children: React.ReactNode }) => (
    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        {children}
    </motion.div>
);

const ActivityForm = () => {
    const [selectedForm, setSelectedForm] = useState("Activity");
    const [result, setResult] = useState<{ song: string; artist: string }[]>([]);
    const [saved, setSaved] = useState(false);
    const [fromLibrary, setFromLibrary] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activityType: "",
            duration: "30",
            intensity: "",
            languageOfMusic: "English",
            favouriteGenres: "",
            favouriteArtists: "",
            mood: "",
        },
    });

    const goToMusic = async () => {
        if (await form.trigger(["activityType", "duration", "intensity"])) {
            setSelectedForm("Music");
        }
    };

    const onSubmit = async (values: FormValues) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post("/api/ai", {
                activityType: values.activityType,
                duration: values.duration,
                intensity: values.intensity,
                language: values.languageOfMusic,
                mood: values.mood,
                genres: values.favouriteGenres,
                artists: values.favouriteArtists,
            });
            setResult(data.songs);
            setSaved(Boolean(data.saved));
            setFromLibrary(data.source === "fallback");
        } catch (err) {
            setResult([]);
            setError(axios.isAxiosError(err) && err.response?.data?.error
                ? err.response.data.error
                : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
            setSelectedForm("Result");
        }
    };

    // If a required Activity field is missing, send the user back to it.
    const onInvalid = () => setSelectedForm("Activity");

    return (
        <div>
            {loading ? (
                <div className="relative bottom-24 right-8">
                    <Loading />
                </div>
            ) : (
                <div className="space-y-4 py-8 pb-16 md:block">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0">
                        <aside className="mr-16">
                            <SidebarNav className="" items={sidebarNavItems} onSelect={setSelectedForm} selectedItem={selectedForm} />
                        </aside>

                        <div className="flex-1">
                            {selectedForm !== "Result" && (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 max-w-6xl">
                                        {selectedForm === "Activity" && (
                                            <>
                                                <Step>
                                                    <FormField control={form.control} name="activityType" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Activity Type</FormLabel>
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className={selectTriggerClass}>
                                                                        <SelectValue placeholder="Select an activity" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className={selectContentClass}>
                                                                    {ACTIVITIES.map((a) => (
                                                                        <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </Step>

                                                <Step>
                                                    <FormField control={form.control} name="duration" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Duration</FormLabel>
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className={selectTriggerClass}>
                                                                        <SelectValue placeholder="How long is your session?" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className={selectContentClass}>
                                                                    {DURATIONS.map((d) => (
                                                                        <SelectItem key={d} value={d}>{d} minutes</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormDescription>We&apos;ll pick enough songs to fill it.</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </Step>

                                                <Step>
                                                    <FormField control={form.control} name="intensity" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Intensity</FormLabel>
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className={selectTriggerClass}>
                                                                        <SelectValue placeholder="Select intensity level" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className={selectContentClass}>
                                                                    <SelectItem value="low">Low</SelectItem>
                                                                    <SelectItem value="medium">Medium</SelectItem>
                                                                    <SelectItem value="high">High</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </Step>

                                                <Button type="button" className="hover:bg-gray-600" onClick={goToMusic}>
                                                    Next
                                                </Button>
                                            </>
                                        )}

                                        {selectedForm === "Music" && (
                                            <>
                                                <Step>
                                                    <FormField control={form.control} name="languageOfMusic" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Language <span className="text-gray-400">(optional)</span></FormLabel>
                                                            <FormControl>
                                                                <Input className={inputClass} placeholder="e.g., English, Hindi, Spanish" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </Step>

                                                <Step>
                                                    <FormField control={form.control} name="favouriteGenres" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Genres <span className="text-gray-400">(optional)</span></FormLabel>
                                                            <FormControl>
                                                                <Input className={inputClass} placeholder="e.g., Hip-hop, EDM, Rock" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </Step>

                                                <Step>
                                                    <FormField control={form.control} name="favouriteArtists" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Favourite artists <span className="text-gray-400">(optional)</span></FormLabel>
                                                            <FormControl>
                                                                <Input className={inputClass} placeholder="e.g., Eminem, The Weeknd" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </Step>

                                                <Step>
                                                    <FormField control={form.control} name="mood" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Mood <span className="text-gray-400">(optional)</span></FormLabel>
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className={selectTriggerClass}>
                                                                        <SelectValue placeholder="Any" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className={selectContentClass}>
                                                                    {MOODS.map((m) => (
                                                                        <SelectItem key={m} value={m} className="capitalize">{m}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </Step>

                                                <div className="space-x-6">
                                                    <Button type="button" className="hover:bg-gray-600" onClick={() => setSelectedForm("Activity")}>
                                                        Back
                                                    </Button>
                                                    <Button type="submit" className="hover:bg-gray-600">
                                                        Get my playlist
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                </Form>
                            )}

                            {selectedForm === "Result" && (
                                <div>
                                    <h2 className="text-2xl md:px-8 font-bold tracking-tight">Recommended Songs</h2>

                                    {error && <div className="md:px-8 font-semibold my-4 text-red-400">{error}</div>}
                                    {!error && result.length === 0 && (
                                        <div className="md:px-8 my-4">No playlist yet. Fill in the Activity and Music steps first.</div>
                                    )}

                                    {result.length > 0 && (
                                        <>
                                            {fromLibrary && (
                                                <p className="md:px-8 mt-2 text-sm text-yellow-400">
                                                    AI suggestions are unavailable right now, so this playlist comes from our built-in library (English songs, matched to your genres and intensity).
                                                </p>
                                            )}
                                            <p className="md:px-8 mt-2 text-sm text-gray-400">
                                                {saved
                                                    ? <>Saved to <Link href="/recommendations" className="underline">your recommendations</Link>. Click a card to find it on Spotify.</>
                                                    : "Click a card to find it on Spotify. Log in to save playlists to your account."}
                                            </p>
                                            <div className="w-full">
                                                <HoverEffect items={result} />
                                            </div>
                                        </>
                                    )}

                                    <div className="space-x-6 md:px-8 my-4">
                                        <Button onClick={() => setSelectedForm("Activity")}>
                                            Back to Activity
                                        </Button>
                                        <Button onClick={() => setSelectedForm("Music")}>
                                            Back to Music
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ActivityForm
