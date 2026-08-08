import { Volume2, VolumeX } from "lucide-react";
import { useSpeech } from "@/hooks/use-speech";

interface SpeakButtonProps {
  text: string;
  label: string;
}

export default function SpeakButton({ text, label }: SpeakButtonProps) {
  const { supported, isSpeaking, speak, stop } = useSpeech();

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={() => (isSpeaking ? stop() : speak(text))}
      aria-pressed={isSpeaking}
      aria-label={isSpeaking ? `Stop reading ${label} aloud` : `Read ${label} aloud`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black text-black transition-colors duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      {isSpeaking ? <VolumeX className="h-5 w-5" aria-hidden="true" /> : <Volume2 className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}