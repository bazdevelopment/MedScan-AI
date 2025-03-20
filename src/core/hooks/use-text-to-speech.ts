/* eslint-disable max-lines-per-function */
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';

import { IETF_BCP_47_FORMAT_LANGUAGE } from '@/constants/language';

import { useSelectedLanguage } from '../i18n';

// Define language types
type SupportedLanguage =
  | 'en'
  | 'ar'
  | 'zh'
  | 'es'
  | 'hi'
  | 'pt'
  | 'ru'
  | 'ja'
  | 'ko'
  | 'de'
  | 'fr'
  | 'ro';

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

// Map of preferred female voices for each supported language
const preferredFemaleVoicesByLanguage: Record<SupportedLanguage, string[]> = {
  en: [
    'com.apple.voice.compact.en-US.Samantha',
    'com.apple.voice.compact.en-AU.Karen',
    'com.apple.voice.compact.en-IE.Moira',
    'com.apple.voice.compact.en-ZA.Tessa',
  ],
  ar: [
    'com.apple.voice.compact.ar-001.Maged', // Note: This is male as no female Arabic voice is in your list
  ],
  zh: [
    'com.apple.voice.compact.zh-CN.Tingting',
    'com.apple.voice.compact.zh-HK.Sinji',
    'com.apple.voice.compact.zh-TW.Meijia',
  ],
  es: [
    'com.apple.voice.compact.es-ES.Monica',
    'com.apple.voice.compact.es-MX.Paulina',
  ],
  hi: ['com.apple.voice.compact.hi-IN.Lekha'],
  pt: [
    'com.apple.voice.compact.pt-BR.Luciana',
    'com.apple.voice.compact.pt-PT.Joana',
  ],
  ru: ['com.apple.voice.compact.ru-RU.Milena'],
  ja: ['com.apple.voice.compact.ja-JP.Kyoko'],
  ko: ['com.apple.voice.compact.ko-KR.Yuna'],
  de: ['com.apple.voice.compact.de-DE.Anna'],
  fr: ['com.apple.voice.compact.fr-CA.Amelie'],
  ro: ['com.apple.voice.compact.ro-RO.Ioana'],
};

// Map of preferred male voices for each supported language (as fallback)
const preferredMaleVoicesByLanguage: Record<SupportedLanguage, string[]> = {
  en: [
    'com.apple.voice.compact.en-GB.Daniel',
    'com.apple.voice.compact.en-IN.Rishi',
    'com.apple.speech.synthesis.voice.Fred',
  ],
  ar: ['com.apple.voice.compact.ar-001.Maged'],
  zh: [], // No male Chinese voices in your list
  es: [], // No male Spanish voices in your list
  hi: [], // No male Hindi voices in your list
  pt: [], // No male Portuguese voices in your list
  ru: [], // No male Russian voices in your list
  ja: [], // No male Japanese voices in your list
  ko: [], // No male Korean voices in your list
  de: [], // No male German voices in your list
  fr: ['com.apple.voice.compact.fr-FR.Thomas'],
  ro: [], // No male Romanian voices in your list
};

export const useTextToSpeech = ({
  preferredGender = 'female',
}: UseTextToSpeechProps): UseTextToSpeechReturn => {
  const { language } = useSelectedLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Speech.Voice | null>(null);

  // Load available voices and select default voice on mount
  useEffect(() => {
    const loadVoices = async () => {
      try {
        setIsLoading(true);
        const voices = await Speech.getAvailableVoicesAsync();
        setAvailableVoices(voices);

        // Get preferred voices based on gender and language
        const preferredVoices =
          preferredGender === 'female'
            ? preferredFemaleVoicesByLanguage[language]
            : preferredMaleVoicesByLanguage[language];

        // Try to find an exact match for a preferred voice
        let matchedVoice = null;
        for (const voiceId of preferredVoices) {
          const voice = voices.find((v) => v.identifier === voiceId);
          if (voice) {
            matchedVoice = voice;
            break;
          }
        }

        // If no preferred voice is found, try to find any voice for the language
        if (!matchedVoice) {
          // Look for voices that contain the language code
          const languageVoices = voices.filter((voice) =>
            voice.language.toLowerCase().startsWith(language.toLowerCase()),
          );

          if (languageVoices.length > 0) {
            matchedVoice = languageVoices[0];
          } else {
            // Last resort: find any voice that might work (partial match)
            const partialMatch = voices.find((voice) =>
              voice.language.toLowerCase().includes(language.toLowerCase()),
            );

            if (partialMatch) {
              matchedVoice = partialMatch;
            } else {
              // Ultimate fallback: just use the first available voice
              matchedVoice = voices[0];
            }
          }
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
