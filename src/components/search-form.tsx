"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  query: z.string().min(3, {
    message: "Please enter at least 3 characters.",
  }),
});

export function SearchForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { query } = values;
    const parts = query.split("-").map((p) => p.trim());
    const artist = parts[0];
    const title = parts.length > 1 ? parts.slice(1).join(' ') : '';

    if (!artist || !title) {
        toast({
          variant: "destructive",
          title: "Invalid Format",
          description: "Please enter the song as 'Artist - Title'.",
        });
        setIsLoading(false);
        return;
      }
      
    router.push(`/?q=${encodeURIComponent(query)}`);
    // A small delay to allow navigation to start before resetting loading state.
    setTimeout(() => setIsLoading(false), 500);
    form.reset();
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Card className="shadow-2xl rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center p-2">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="type a song, get a bpm"
                        {...field}
                        className="text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 pl-4 pr-12"
                      />
                      <Button type="submit" disabled={isLoading} size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-transparent hover:bg-muted text-foreground">
                        {isLoading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Search className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-center pt-2 px-4" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Card>
      <p className="text-center text-sm text-muted-foreground mt-2">
        For example: <span className="font-bold text-foreground">david bowie - space oddity</span> (which is 81 BPM, by the way)
      </p>
    </div>
  );
}
