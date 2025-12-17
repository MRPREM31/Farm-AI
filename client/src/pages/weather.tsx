import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Wind, Droplets, Thermometer, AlertTriangle, Sun, Cloud, CloudSnow, CloudFog, CloudLightning } from "lucide-react";
import weatherIcon from "@assets/generated_images/3d_icon_of_sun_and_cloud_weather.png";
import { useQuery } from "@tanstack/react-query";

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    rain: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return Sun;
  if (code >= 1 && code <= 3) return Cloud;
  if (code >= 45 && code <= 48) return CloudFog;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 80 && code <= 82) return CloudRain;
  if (code >= 95) return CloudLightning;
  return Sun;
};

const getWeatherLabel = (code: number) => {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Thunderstorm";
  return "Clear";
};

export default function Weather() {
  const { data: weather, isLoading } = useQuery<WeatherData>({
    queryKey: ["weather"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=20.2961&longitude=85.8245&current=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto"
      );
      return response.json();
    },
  });

  if (isLoading || !weather) {
    return (
      <Layout>
        <div className="bg-blue-50/50 min-h-screen flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-20 w-20 bg-blue-200 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-blue-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const CurrentIcon = getWeatherIcon(weather.current.weather_code);
  const currentLabel = getWeatherLabel(weather.current.weather_code);

  return (
    <Layout>
      <div className="bg-blue-50/50 min-h-screen pb-20">
        <div className="container px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold">Weather</h1>
              <p className="text-muted-foreground">Bhubaneswar, Odisha</p>
            </div>
            <img src={weatherIcon} alt="Weather" className="h-20 w-20 object-contain drop-shadow-lg" />
          </div>

          {/* Current Weather Card */}
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-xl mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                   <p className="text-blue-100 font-medium mb-1">Today</p>
                   <div className="text-6xl font-display font-bold mb-2">{Math.round(weather.current.temperature_2m)}°</div>
                   <p className="text-lg font-medium opacity-90">{currentLabel}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
                  <CurrentIcon className="h-10 w-10 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="flex justify-center mb-1"><Wind className="h-5 w-5 opacity-80" /></div>
                  <p className="text-sm opacity-70">Wind</p>
                  <p className="font-bold">{weather.current.wind_speed_10m} km/h</p>
                </div>
                <div className="text-center border-l border-white/20 border-r">
                  <div className="flex justify-center mb-1"><Droplets className="h-5 w-5 opacity-80" /></div>
                  <p className="text-sm opacity-70">Humidity</p>
                  <p className="font-bold">{weather.current.relative_humidity_2m}%</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1"><CloudRain className="h-5 w-5 opacity-80" /></div>
                  <p className="text-sm opacity-70">Rain</p>
                  <p className="font-bold">{weather.current.rain} mm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Section */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Farming Alerts</h2>
            {weather.current.relative_humidity_2m > 80 ? (
               <Card className="border-l-4 border-l-red-500 bg-red-50/50">
                 <CardContent className="p-4 flex gap-4">
                    <div className="shrink-0">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-900">High Humidity Alert</h3>
                      <p className="text-sm text-red-800/80 mt-1">
                        High humidity detected ({weather.current.relative_humidity_2m}%). Watch out for fungal diseases.
                      </p>
                    </div>
                 </CardContent>
               </Card>
            ) : weather.current.temperature_2m > 35 ? (
              <Card className="border-l-4 border-l-orange-500 bg-orange-50/50">
                 <CardContent className="p-4 flex gap-4">
                    <div className="shrink-0">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Thermometer className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-900">Heat Stress Warning</h3>
                      <p className="text-sm text-orange-800/80 mt-1">
                        Temperatures are high. Ensure adequate irrigation for crops.
                      </p>
                    </div>
                 </CardContent>
               </Card>
            ) : (
               <Card className="border-l-4 border-l-green-500 bg-green-50/50">
                 <CardContent className="p-4 flex gap-4">
                    <div className="shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Sun className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-green-900">Good Conditions</h3>
                      <p className="text-sm text-green-800/80 mt-1">
                        Current weather is favorable for most field activities.
                      </p>
                    </div>
                 </CardContent>
               </Card>
            )}
          </div>

          {/* Forecast */}
          <div>
            <h2 className="font-bold text-lg mb-3">Forecast</h2>
            <div className="space-y-3">
              {weather.daily.time.slice(1, 4).map((date, i) => {
                const DailyIcon = getWeatherIcon(weather.daily.weather_code[i+1]);
                const dayLabel = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
                
                return (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="font-medium w-24">{dayLabel}</span>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <DailyIcon className="h-4 w-4" />
                        {getWeatherLabel(weather.daily.weather_code[i+1])}
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold">{Math.round(weather.daily.temperature_2m_max[i+1])}°</span>
                        <span className="text-muted-foreground">{Math.round(weather.daily.temperature_2m_min[i+1])}°</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
