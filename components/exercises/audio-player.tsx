"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Volume2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface AudioPlayerProps {
  path?: string | null;
  text?: string;
  label?: string;
  autoPlay?: boolean;
  variant?: "icon" | "button";
}

export function AudioPlayer({ path, text, label = "Anhören", autoPlay = false, variant = "icon" }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTts = typeof window !== "undefined" && "speechSynthesis" in window;

  const url = useMemo<string | null>(() => {
    if (!path) return null;
    if (path.startsWith("/") || path.startsWith("http")) return path;
    const supabase = createClient();
    const { data } = supabase.storage.from("audio").getPublicUrl(path);
    return data.publicUrl;
  }, [path]);

  useEffect(() => {
    if (!url) {
      audioRef.current = null;
      return;
    }
    const a = new Audio(url);
    const handleEnded = () => setPlaying(false);
    const handleError = () => setPlaying(false);
    a.addEventListener("ended", handleEnded);
    a.addEventListener("error", handleError);
    audioRef.current = a;

    if (autoPlay) {
      a.play().catch(() => {
        setTimeout(() => setPlaying(false), 0);
      });
      setTimeout(() => setPlaying(true), 0);
    }

    return () => {
      a.pause();
      a.removeEventListener("ended", handleEnded);
      a.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, [url, autoPlay]);

  const stopTts = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const playTts = useCallback(() => {
    if (!text || typeof window === "undefined" || !window.speechSynthesis) return;
    setPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  }, [text]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);



  const toggle = () => {
    if (playing) {
      audioRef.current?.pause();
      stopTts();
      setPlaying(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setPlaying(false);
      });
      setPlaying(true);
    } else if (text && hasTts) {
      playTts();
      setPlaying(true);
    }
  };

  if (!path && !text) return null;
  if (!path && !hasTts) return null;

  const isButton = variant === "button";

  return (
    <Button
      type="button"
      variant={isButton ? "default" : "ghost"}
      size={isButton ? "default" : "sm"}
      onClick={toggle}
      className={isButton ? "gap-2" : "h-8 px-2"}
      title={path ? "Audio abspielen" : "Vorlesen (TTS)"}
    >
      {playing ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
      {isButton ? <span>{label}</span> : <span className="sr-only">{label}</span>}
    </Button>
  );
}
