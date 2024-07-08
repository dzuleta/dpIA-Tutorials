"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

interface WeatherData {
  location?: string;
  temperature?: number;
  conditions?: string;
}

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const isEmpty = Object.keys(weatherData).length === 0;

  const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
    if (call?.function?.name !== "search_information") return;
    const args = JSON.parse(call.function.arguments);
    console.log(args);
  
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: args.query })
      });
  
      if (!response.ok) {
        throw new Error('Error fetching information');
      }
  
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      return JSON.stringify(data);
    } catch (error) {
      console.error("Error fetching information:", error);
      throw new Error("Could not fetch information");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget
            location={weatherData.location || "---"}
            temperature={weatherData.temperature?.toString() || "---"}
            conditions={weatherData.conditions || "Sunny"}
            isEmpty={isEmpty}
          />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
