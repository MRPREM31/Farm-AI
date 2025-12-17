import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Mic, CloudRain, Trophy } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/lush_green_agriculture_field_with_morning_light.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary/5 pb-10">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={heroImage}
            alt="Agriculture field"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        </div>

        <div className="container relative z-10 px-4 pt-8 md:pt-16">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4 text-primary-foreground bg-primary/90 hover:bg-primary">
              AI Powered Farming 🌾
            </Badge>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Protect Your Crops <br />
              <span className="text-primary">Grow Your Future</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Instant crop diagnosis, weather alerts, and expert farming knowledge in your pocket. No login required.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/diagnosis">
                <Button size="lg" className="w-full text-base font-semibold shadow-lg shadow-primary/20 sm:w-auto">
                  <Leaf className="mr-2 h-5 w-5" />
                  Diagnose Crop
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="w-full text-base font-semibold sm:w-auto bg-background/80 backdrop-blur">
                  <Trophy className="mr-2 h-5 w-5 text-accent" />
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="container px-4 py-8">
        <h2 className="mb-6 font-display text-xl font-bold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link href="/diagnosis">
            <Card className="group h-full cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:scale-110 transition-transform">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-semibold">Crop Doctor</h3>
                <p className="text-xs text-muted-foreground">Identify diseases</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/weather">
            <Card className="group h-full cursor-pointer transition-all hover:border-blue-400/50 hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
                  <CloudRain className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-semibold">Weather</h3>
                <p className="text-xs text-muted-foreground">Rain alerts</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/learn">
            <Card className="group h-full cursor-pointer transition-all hover:border-yellow-400/50 hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="mb-1 font-semibold">Learn</h3>
                <p className="text-xs text-muted-foreground">Earn points</p>
              </CardContent>
            </Card>
          </Link>

           <Card className="group h-full cursor-pointer transition-all hover:border-orange-400/50 hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:scale-110 transition-transform">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-semibold">Voice Help</h3>
              <p className="text-xs text-muted-foreground">Ask in Hindi</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Daily Tip Section */}
      <div className="container px-4 pb-12">
        <div className="rounded-2xl bg-secondary p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-secondary-foreground/70">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">!</span>
                Tip of the Day
              </div>
              <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
                Avoid spraying pesticides before noon today.
              </h3>
              <p className="text-secondary-foreground/80">
                High winds expected. Spraying now may cause drift to neighboring fields.
              </p>
            </div>
            <Button variant="outline" className="shrink-0 border-secondary-foreground/20 hover:bg-secondary-foreground/10 text-secondary-foreground">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
