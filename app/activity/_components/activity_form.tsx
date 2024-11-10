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
import { Separator } from '@/components/ui/separator';
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Source_Code_Pro } from "next/font/google";
import { TextGenerateEffect } from "@/components/ui/text-generate";
import { Meteors } from "@/components/ui/meteors";
import { Vortex } from "@/components/ui/vortex";
import { SparklesCore } from "@/components/ui/sparkles";
import { HoverEffect } from "@/components/ui/card-hover";
import Loading from "@/app/loading";
import { IconBrandSpotify } from "@tabler/icons-react";

const scp_font = Source_Code_Pro({
    weight: "700",
    subsets: []
})

const sidebarNavItems = [
    { title: "Activity" },
    { title: "Music" },
    { title: "Result" }
];

const formSchema = z.object({
    activityType: z.string().min(1, { message: "Activity type is required" }),
    predictionPreference: z.string().min(1, { message: "Prediction preference is required" }),
    duration: z.string().min(1, { message: "Duration is required" }),
    intensity: z.string().min(1, { message: "Intensity is required" }),
    frequency: z.string().optional(),
    distance: z.string().optional(),
    location: z.string().optional(),
    mood: z.string().optional(),
    timeOfDay: z.string().optional(),
    equipment: z.string().optional(),
    additionalComments: z.string().optional(),
    favouriteGenres: z.string().optional(),
    languageOfMusic: z.string().min(1, { message: "Language is required" }),
    favouriteArtists: z.string().optional(),
    favouriteSongs: z.string().optional(),
});

const ActivityForm = () => {

    const router = useRouter();
    const [selectedForm, setSelectedForm] = useState("Activity");
    const [predictionPreference, setPredictionPreference] = useState("low");
    const [result, setResult] = useState<{ song: string; artist: string }[]>([]);
    const [loading, isLoading] = useState(false)


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activityType: "",
            predictionPreference: "low",
            duration: "",
            intensity: "",
            frequency: "",
            distance: "",
            location: "",
            mood: "",
            timeOfDay: "",
            equipment: "",
            additionalComments: "",
            languageOfMusic: "",
            favouriteGenres: "",
            favouriteArtists: "",
            favouriteSongs: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const extractSongs = (response: string) => {
        const songs = [];
        const pattern = /\d+\.\s+\*\*(.*?)\*\*\s+-\s+(.*?)\n/g;
        let match;

        while ((match = pattern.exec(response)) !== null) {
            const songTitle = match[1];
            const artist = match[2];
            songs.push({ song: songTitle, artist: artist });
        }

        return songs;
    };

    const onSubmit = async (values: any) => {
        try {
            isLoading(true)
            const response = await axios.post("/api/ai", { message: values });
            const songList = extractSongs(response.data);
            setResult(songList);
            setSelectedForm("Result");
            isLoading(false)

        } catch (error) {
            isLoading(false)
            console.error("Error:", error);
        }
    };

    return (
        <div >
            {loading ? <>
                <div className="relative bottom-24 right-8">
                    <Loading />
                </div>
            </> : <>
                <div className={`space-y-4 py-8 pb-16 md:block`}>

                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0">
                        <aside className="mr-16">
                            <SidebarNav className="" items={sidebarNavItems} onSelect={setSelectedForm} selectedItem={selectedForm} />
                        </aside>


                        <div className="flex-1">
                            {selectedForm !== "Result" && (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-6xl">
                                        {selectedForm === "Activity" &&
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="activityType"
                                                    render={({ field }) => (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <FormItem>
                                                                <FormLabel>Activity Type</FormLabel>
                                                                <FormControl >
                                                                    <Select {...field}
                                                                        onValueChange={(value) => {
                                                                            field.onChange(value);

                                                                        }}>
                                                                        <SelectTrigger className={`bg-[#121212] h-[50px] ring-2 border-none ${scp_font.className}`}>
                                                                            <SelectValue placeholder="Select an activity" />
                                                                        </SelectTrigger>
                                                                        <SelectContent className="bg-[#121212] border border-gray-400 rounded-lg text-white">
                                                                            <SelectItem value="running">Running</SelectItem>
                                                                            <SelectItem value="cycling">Cycling</SelectItem>
                                                                            <SelectItem value="gymWorkouts">Gym Workouts</SelectItem>
                                                                            <SelectItem value="yogaStretching">Yoga & Stretching</SelectItem>
                                                                            <SelectItem value="sports">Sports</SelectItem>
                                                                            <SelectItem value="dance">Dance</SelectItem>
                                                                            <SelectItem value="martialArts">Martial Arts</SelectItem>
                                                                            <SelectItem value="hikingWalking">Hiking & Walking</SelectItem>
                                                                            <SelectItem value="waterActivities">Water Activities</SelectItem>
                                                                            <SelectItem value="winterSports">Winter Sports</SelectItem>
                                                                            <SelectItem value="climbing">Climbing</SelectItem>
                                                                            <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormDescription>Choose the type of activity you engage in.</FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        </motion.div>
                                                    )}
                                                />

                                                <motion.div
                                                    initial={{ opacity: 0, x: -100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name="predictionPreference"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Prediction Preference</FormLabel>
                                                                <FormControl>
                                                                    <Select
                                                                        {...field}
                                                                        onValueChange={(value) => {
                                                                            field.onChange(value);
                                                                            setPredictionPreference(value);
                                                                        }}
                                                                    >
                                                                        <SelectTrigger className={`bg-[#121212] h-[50px] ring-2 border-none ${scp_font.className}`}>
                                                                            <SelectValue placeholder="Select prediction preference" />
                                                                        </SelectTrigger>
                                                                        <SelectContent className="bg-[#121212] border border-gray-400 rounded-lg text-white">
                                                                            <SelectItem value="high">High</SelectItem>
                                                                            <SelectItem value="medium">Medium</SelectItem>
                                                                            <SelectItem value="low">Low</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormDescription>Select the level of prediction detail you prefer.</FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                {["high", "medium", "low"].includes(predictionPreference) && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <FormField
                                                            control={form.control}
                                                            name="duration"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Duration</FormLabel>
                                                                    <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                        <Input className={`${scp_font.className}}`} placeholder="e.g., 30 minutes" {...field} />
                                                                    </FormControl>
                                                                    <FormDescription>Enter the duration of your activity.</FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </motion.div>
                                                )}

                                                {["high", "medium", "low"].includes(predictionPreference) && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <FormField
                                                            control={form.control}
                                                            name="intensity"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Intensity</FormLabel>
                                                                    <FormControl>
                                                                        <Select {...field}
                                                                            onValueChange={(value) => {
                                                                                field.onChange(value);

                                                                            }}>
                                                                            <SelectTrigger className={`bg-[#121212] h-[50px] ring-2 border-none ${scp_font.className}`}>
                                                                                <SelectValue placeholder="Select intensity level" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-[#121212] border border-gray-400 rounded-lg text-white">
                                                                                <SelectItem value="low">Low</SelectItem>
                                                                                <SelectItem value="medium">Medium</SelectItem>
                                                                                <SelectItem value="high">High</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>
                                                                    <FormDescription>Select the intensity of your activity.</FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </motion.div>
                                                )}

                                                {["high", "medium"].includes(predictionPreference) && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <FormField
                                                            control={form.control}
                                                            name="frequency"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Frequency</FormLabel>
                                                                    <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                        <Input className={`${scp_font.className}}`} placeholder="e.g., 3 times a week" {...field} />
                                                                    </FormControl>
                                                                    <FormDescription>Enter the frequency of your activity.</FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </motion.div>
                                                )}

                                                {predictionPreference === "high" && (
                                                    <>
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <FormField
                                                                control={form.control}
                                                                name="distance"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Distance</FormLabel>
                                                                        <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                            <Input className={`${scp_font.className}}`} placeholder="e.g., 5 km" {...field} />
                                                                        </FormControl>
                                                                        <FormDescription>Enter the distance covered (if applicable).</FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, x: -100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <FormField
                                                                control={form.control}
                                                                name="location"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Location</FormLabel>
                                                                        <FormControl>
                                                                            <Select {...field}
                                                                                onValueChange={(value) => {
                                                                                    field.onChange(value);

                                                                                }}>
                                                                                <SelectTrigger className={`bg-[#121212] h-[50px] ring-2 border-none ${scp_font.className}`}>
                                                                                    <SelectValue placeholder="Select location" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-[#121212] border border-gray-400 rounded-lg text-white">
                                                                                    <SelectItem value="indoor">Indoor</SelectItem>
                                                                                    <SelectItem value="outdoor">Outdoor</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </FormControl>
                                                                        <FormDescription>Select the location of your activity.</FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, x: -100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <FormField
                                                                control={form.control}
                                                                name="mood"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Mood</FormLabel>
                                                                        <FormControl>
                                                                            <Select {...field}
                                                                                onValueChange={(value) => {
                                                                                    field.onChange(value);

                                                                                }}>
                                                                                <SelectTrigger className={`bg-[#121212] h-[50px] ring-2 border-none ${scp_font.className}`}>
                                                                                    <SelectValue placeholder="Select your mood" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-[#121212] border border-gray-400 rounded-lg text-white">
                                                                                    <SelectItem value="energetic">Energetic</SelectItem>
                                                                                    <SelectItem value="relaxed">Relaxed</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </FormControl>
                                                                        <FormDescription>Select your mood during the activity.</FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, x: -100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <FormField
                                                                control={form.control}
                                                                name="timeOfDay"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Time of Day</FormLabel>
                                                                        <FormControl>
                                                                            <Select {...field}
                                                                                onValueChange={(value) => {
                                                                                    field.onChange(value);

                                                                                }}>
                                                                                <SelectTrigger className={`bg-[#121212] h-[50px] ring-2 border-none ${scp_font.className}`}>
                                                                                    <SelectValue placeholder="Select time of day" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-[#121212] border border-gray-400 rounded-lg text-white">
                                                                                    <SelectItem value="morning">Morning</SelectItem>
                                                                                    <SelectItem value="afternoon">Afternoon</SelectItem>
                                                                                    <SelectItem value="evening">Evening</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </FormControl>
                                                                        <FormDescription>Select the time of day for your activity.</FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, x: -100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <FormField
                                                                control={form.control}
                                                                name="equipment"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Equipment Used</FormLabel>
                                                                        <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                            <Input className={`${scp_font.className}}`} placeholder="e.g., dumbbells, yoga mat" {...field} />
                                                                        </FormControl>
                                                                        <FormDescription>Enter the equipment used (if applicable).</FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>

                                                    </>
                                                )}

                                                <motion.div
                                                    initial={{ opacity: 0, x: -100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name="additionalComments"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Additional Comments</FormLabel>
                                                                <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                    <Input className={`${scp_font.className}}`} placeholder="Any other details..." {...field} />
                                                                </FormControl>
                                                                <FormDescription>Provide any additional comments or details.</FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                <Button className="hover:bg-gray-600" onClick={() => { setSelectedForm("Music") }}>
                                                    Next
                                                </Button>
                                            </>}
                                        {selectedForm === "Music" && <>
                                            <motion.div
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="languageOfMusic"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Language of Music</FormLabel>
                                                            <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                <Input className={`${scp_font.className}}`} placeholder="Enter language of music" {...field} />
                                                            </FormControl>
                                                            <FormDescription>Enter the language of the music you prefer.</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="favouriteGenres"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Favourite Genres</FormLabel>
                                                            <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                <Input className={`${scp_font.className}}`} placeholder="Enter your favourite genres" {...field} />
                                                            </FormControl>
                                                            <FormDescription>Enter your favourite music genres.</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="favouriteArtists"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Favourite Artists/Brands</FormLabel>
                                                            <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                <Input className={`${scp_font.className}}`} placeholder="Enter your favourite artists or brands" {...field} />
                                                            </FormControl>
                                                            <FormDescription>Enter your favourite music artists or brands.</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="favouriteSongs"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Favourite Songs</FormLabel>
                                                            <FormControl className="bg-[#121212] h-[50px] ring-2 border-none">
                                                                <Input className={`${scp_font.className}}`} placeholder="Enter your favourite songs" {...field} />
                                                            </FormControl>
                                                            <FormDescription>Enter your favourite music songs.</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="mood"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Mood</FormLabel>
                                                            <FormControl>
                                                                <Select {...field}
                                                                    onValueChange={(value) => {
                                                                        field.onChange(value);

                                                                    }}>
                                                                    <SelectTrigger className={`bg-[#121212] h-[50px] ring-2 border-none ${scp_font.className}`}>
                                                                        <SelectValue placeholder="Select your mood" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-[#121212] border border-gray-400 rounded-lg text-white">
                                                                        <SelectItem value="happy">Happy</SelectItem>
                                                                        <SelectItem value="sad">Sad</SelectItem>
                                                                        <SelectItem value="energetic">Energetic</SelectItem>
                                                                        <SelectItem value="relaxed">Relaxed</SelectItem>
                                                                        <SelectItem value="romantic">Romantic</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormDescription>Select your current mood.</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>

                                            <div className="space-x-4">
                                                <Button className="hover:bg-gray-600" onClick={() => { setSelectedForm("Activity") }}>
                                                    Previous
                                                </Button>

                                                <Button className="hover:bg-gray-600" type="submit" disabled={isSubmitting}>
                                                    Submit
                                                </Button>
                                            </div>
                                        </>}


                                    </form>
                                </Form>
                            )}

                            {selectedForm === "Result" && (
                                <div>
                                    <h2 className="text-2xl md:px-8 font-bold tracking-tight">Recommended Songs</h2>

                                    {result.length == 0 && <div className="md:px-8 font-semibold my-4">No Songs Found!</div>}

                                    <div className="w-full">
                                        <HoverEffect items={result} />
                                    </div>

                                    <div className="space-x-6 md:px-8 my-4">
                                        <Button onClick={() => setSelectedForm("Activity")}>
                                            Back to Activity
                                        </Button>
                                        <Button onClick={() => setSelectedForm("Music")}>
                                            Back to Music
                                        </Button>
                                        <Button onClick={() => { }} className="bg-[#121212] border border-green-400 hover:bg-gray-500 hover:bg-opacity-15 transition-all duration-300">
                                            Export to <div className={`ml-1 flex items-center`}>Spotify</div>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </>}

        </div>
    );
}

export default ActivityForm
