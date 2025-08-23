/* eslint-disable max-lines-per-function */
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';

import {
  AI_ANALYSIS_LANGUAGE_SELECTION,
  IETF_BCP_47_FORMAT_LANGUAGE,
} from '@/constants/language';

import { useSelectedLanguage } from '../i18n';
import { getStorageItem } from '../storage';

interface UseTextToSpeechProps {
  preferredGender?: 'female' | 'male';
}

interface SpeechOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  voice?: string;
}

interface UseTextToSpeechReturn {
  speak: (text: string, options?: SpeechOptions) => Promise<void>;
  stop: () => Promise<void>;
  isSpeaking: boolean;
  availableVoices: Speech.Voice[];
  selectedVoice: Speech.Voice | null;
  setVoice: (voiceIdentifier: string) => void;
  pauseSpeaking: () => Promise<void>;
  resumeSpeaking: () => Promise<void>;
  isLoading: boolean;
}

export const useTextToSpeech = ({
  preferredGender = 'female',
}: UseTextToSpeechProps): UseTextToSpeechReturn => {
  const { language } = useSelectedLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Speech.Voice | null>(null);
  const languageAIResponsesLocally = getStorageItem(
    AI_ANALYSIS_LANGUAGE_SELECTION,
  );
  const voiceLanguage = languageAIResponsesLocally || language;
  // Load available voices and select default voice on mount
  useEffect(() => {
    const loadVoices = async () => {
      try {
        setIsLoading(true);
        const voices = await Speech.getAvailableVoicesAsync();
        setAvailableVoices(voices);

        // Try to find an exact match for a preferred voice
        let matchedVoice = null;
        // for (const voiceId of preferredVoices) {
        const voice = voices.find((v) => v.language.includes(voiceLanguage));

        if (voice) {
          matchedVoice = voice;
        }

        // If no preferred voice is found, try to find any voice for the language, by default en
        if (!matchedVoice) {
          // Look for voices that contain the language code
          const voiceFallback = voices.find((v) =>
            v.language.includes(voiceLanguage),
          );

          matchedVoice = voiceFallback;
        }

        setSelectedVoice(matchedVoice);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading voices:', error);
        setIsLoading(false);
      }
    };

    loadVoices();
  }, [language, preferredGender]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const setVoice = (voiceIdentifier: string) => {
    const voice =
      availableVoices.find((v) => v.identifier === voiceIdentifier) || null;
    setSelectedVoice(voice);
  };

  const speak = async (
    text: string,
    options?: SpeechOptions,
  ): Promise<void> => {
    try {
      // Stop any ongoing speech
      await Speech.stop();
      // Merge default options with user options and selected voice
      const speechOptions: SpeechOptions = {
        pitch: 1.0,
        rate: 1.0,
        volume: 1.0,
        voice: selectedVoice?.identifier,
        language: IETF_BCP_47_FORMAT_LANGUAGE[language],
        ...options,
      };

      setIsSpeaking(true);

      // Start speaking
      Speech.speak(text, {
        ...speechOptions,
        onDone: () => setIsSpeaking(false),
        onError: (error) => {
          console.error('Speech error:', error);
          setIsSpeaking(false);
        },
      });
    } catch (error) {
      console.error('Error in speak function:', error);
      setIsSpeaking(false);
    }
  };

  const stop = async (): Promise<void> => {
    try {
      await Speech.stop();
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  };

  const pauseSpeaking = async (): Promise<void> => {
    try {
      if (isSpeaking) {
        await Speech.pause();
      }
    } catch (error) {
      console.error('Error pausing speech:', error);
    }
  };

  const resumeSpeaking = async (): Promise<void> => {
    try {
      await Speech.resume();
    } catch (error) {
      console.error('Error resuming speech:', error);
    }
  };

  return {
    speak,
    stop,
    isSpeaking,
    availableVoices,
    selectedVoice,
    setVoice,
    pauseSpeaking,
    resumeSpeaking,
    isLoading,
  };
};
