import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const JokeGenerator = () => {
  const [category, setCategory] = useState("general");
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async (selectedCategory = category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://official-joke-api.appspot.com/jokes/${selectedCategory}/random`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJoke(data[0]);
    } catch (err) {
      setError("Failed to fetch joke", err);
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke("general");
  }, []);

  useEffect(() => {
    fetchJoke(category);
  }, [category]);

  return (
    <div className="max-w-xl mx-auto p-">
      <h1 className="text-2xl text-purple-700 text-center font-bold mb-4">
        Random Joke Generator
      </h1>

      <div className="mb-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full bg-purple-700 text-white">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-purple-700 text-white">
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="dad">Dad</SelectItem>
            <SelectItem value="knock-knock">Knock-Knock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        ) : error ? (
          <div className="text-red-500 font-medium">{error}</div>
        ) : joke ? (
          <Card>
            <CardContent className="p-4">
              <p className="text-lg font-semibold mb-2">{joke.setup}</p>
              <p className="text-base text-gray-700">{joke.punchline}</p>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <Button
        className="cursor-pointer bg-purple-700"
        onClick={() => fetchJoke()}
      >
        Get New Joke
      </Button>
    </div>
  );
};

export default JokeGenerator;
