/* eslint-disable max-lines-per-function */
import { useColorScheme } from 'nativewind';
import React, { useCallback, useMemo, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { translate } from '@/core';
import { colors, Text } from '@/ui';
import { CheckIcon } from '@/ui/assets/icons/check';
import { SearchIcon } from '@/ui/assets/icons/search';

interface LanguageItem {
  label: string;
  value: string;
}

interface LanguageContentProps {
  selectedLanguage: string;
  onLanguageSelect: (languageCode: string) => void;
  onClose: () => void;
}
const langs: LanguageItem[] = [
  // Languages from the original list
  { label: `English 🇺🇸`, value: 'en' },
  { label: `Español 🇪🇸`, value: 'es' },
  { label: `Français 🇫🇷`, value: 'fr' },
  { label: `Deutsch 🇩🇪`, value: 'de' },
  { label: `Italiano 🇮🇹`, value: 'it' },
  { label: `Português 🇵🇹`, value: 'pt' },
  { label: `Русский 🇷🇺`, value: 'ru' },
  { label: `日本語 🇯🇵`, value: 'ja' },
  { label: `한국어 🇰🇷`, value: 'ko' },
  { label: `中文 (简体) 🇨🇳`, value: 'zh' }, // Simplified Chinese
  { label: `中文 (繁體) 🇹🇼`, value: 'zh-TW' }, // Traditional Chinese
  { label: `हिन्दी 🇮🇳`, value: 'hi' },
  { label: `العربية 🇸🇦`, value: 'ar' },
  { label: `Türkçe 🇹🇷`, value: 'tr' },
  { label: `Polski 🇵🇱`, value: 'pl' },
  { label: `Nederlands 🇳🇱`, value: 'nl' },
  { label: `Română 🇷🇴`, value: 'ro' },
  { label: `Українська 🇺🇦`, value: 'uk' },
  { label: `Svenska 🇸🇪`, value: 'sv' },
  { label: `Dansk 🇩🇰`, value: 'da' },
  { label: `Suomi 🇫🇮`, value: 'fi' },
  { label: `Norsk 🇳🇴`, value: 'no' },
  { label: `Čeština 🇨🇿`, value: 'cs' },
  { label: `Magyar 🇭🇺`, value: 'hu' },
  { label: `Ελληνικά 🇬🇷`, value: 'el' },
  { label: `Български 🇧🇬`, value: 'bg' },
  { label: `Hrvatski 🇭🇷`, value: 'hr' },
  { label: `Slovenščina 🇸🇮`, value: 'sl' },
  { label: `Lietuvių 🇱🇹`, value: 'lt' },
  { label: `Latviešu 🇱🇻`, value: 'lv' },

  // Additional European Languages
  { label: `Português (Brasil) 🇧🇷`, value: 'pt-BR' },
  { label: `Slovenčina 🇸🇰`, value: 'sk' },
  { label: `Eesti 🇪🇪`, value: 'et' },
  { label: `Gaeilge 🇮🇪`, value: 'ga' },
  { label: `Íslenska 🇮🇸`, value: 'is' },
  { label: `Malti 🇲🇹`, value: 'mt' },
  { label: `Català 🇦🇩`, value: 'ca' }, // Andorra flag for Catalan
  { label: `Euskara`, value: 'eu' }, // No official flag for Basque Country
  { label: `Galego`, value: 'gl' }, // No official flag for Galicia
  { label: `Српски 🇷🇸`, value: 'sr' },
  { label: `Shqip 🇦🇱`, value: 'sq' },
  { label: `Македонски 🇲🇰`, value: 'mk' },
  { label: `Беларуская 🇧🇾`, value: 'be' },
  { label: `Cymraeg 🏴󠁧󠁢󠁷󠁬󠁳󠁿`, value: 'cy' },
  { label: `Latina 🇻🇦`, value: 'la' },

  // Additional Asian Languages
  { label: `Bahasa Indonesia 🇮🇩`, value: 'id' },
  { label: `Bahasa Melayu 🇲🇾`, value: 'ms' },
  { label: `Tiếng Việt 🇻🇳`, value: 'vi' },
  { label: `ภาษาไทย 🇹🇭`, value: 'th' },
  { label: `Tagalog 🇵🇭`, value: 'tl' },
  { label: `עברית 🇮🇱`, value: 'he' },
  { label: `فارسی 🇮🇷`, value: 'fa' },
  { label: `اردو 🇵🇰`, value: 'ur' },
  { label: `বাংলা 🇧🇩`, value: 'bn' },
  { label: `ਪੰਜਾਬੀ 🇮🇳`, value: 'pa' },
  { label: `ગુજરાતી 🇮🇳`, value: 'gu' },
  { label: `தமிழ் 🇮🇳`, value: 'ta' },
  { label: `తెలుగు 🇮🇳`, value: 'te' },
  { label: `ಕನ್ನಡ 🇮🇳`, value: 'kn' },
  { label: `മലയാളം 🇮🇳`, value: 'ml' },
  { label: `मराठी 🇮🇳`, value: 'mr' },
  { label: `नेपाली 🇳🇵`, value: 'ne' },
  { label: `සිංහල 🇱🇰`, value: 'si' },
  { label: `ខ្មែរ 🇰🇭`, value: 'km' },
  { label: `ພາສາລາວ 🇱🇦`, value: 'lo' },
  { label: `မြန်မာဘာသာ 🇲🇲`, value: 'my' },
  { label: `ქართული 🇬🇪`, value: 'ka' },
  { label: `Հայերեն 🇦🇲`, value: 'hy' },
  { label: `Azərbaycan 🇦🇿`, value: 'az' },
  { label: `Oʻzbekcha 🇺🇿`, value: 'uz' },
  { label: `Қазақша 🇰🇿`, value: 'kk' },

  // African Languages
  { label: `Afrikaans 🇿🇦`, value: 'af' },
  { label: `Swahili 🇰🇪`, value: 'sw' }, // Kenya flag as a representative
  { label: `Hausa 🇳🇬`, value: 'ha' },
  { label: `Yorùbá 🇳🇬`, value: 'yo' },
  { label: `Igbo 🇳🇬`, value: 'ig' },
  { label: `Zulu 🇿🇦`, value: 'zu' },
  { label: `Xhosa 🇿🇦`, value: 'xh' },
  { label: `Amharic 🇪🇹`, value: 'am' },
  { label: `Oromo 🇪🇹`, value: 'om' },
  { label: `Somali 🇸🇴`, value: 'so' },
  { label: `Malagasy 🇲🇬`, value: 'mg' },
];

// eslint-disable-next-line max-lines-per-function
const LanguageAnalysisContent = ({
  selectedLanguage,
  onLanguageSelect,
}: LanguageContentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const filteredLanguages = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return langs;

    return langs.filter(
      (lang) =>
        lang.label.toLowerCase().includes(query) ||
        lang.value.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const handleLanguageSelect = useCallback(
    (languageCode: string) => {
      onLanguageSelect(languageCode);
      setSearchQuery('');
    },
    [onLanguageSelect],
  );

  const renderLanguageItem = useCallback(
    ({ item }: { item: LanguageItem }) => (
      <TouchableOpacity
        onPress={() => handleLanguageSelect(item.value)}
        className={`flex-row items-center justify-between border-b border-black/20 px-6 py-4 dark:border-white/10`}
        activeOpacity={0.7}
      >
        <Text className="flex-1 font-semibold-nunito text-[15px] text-black dark:text-white">
          {item.label}
        </Text>
        {selectedLanguage === item.value && (
          <CheckIcon
            width={20}
            height={20}
            strokeWidth={2.5}
            color={colors.primary[900]}
          />
        )}
      </TouchableOpacity>
    ),
    [selectedLanguage, handleLanguageSelect],
  );

  return (
    <View className="flex-1">
      <View className="border-b border-white/10 px-4 pb-2">
        <View className="flex-row items-center rounded-xl bg-black/5 px-4 py-3 dark:bg-white/10">
          <SearchIcon
            width={18}
            height={18}
            color={isDark ? colors.charcoal[500] : colors.charcoal[600]}
          />
          <TextInput
            placeholder={translate(
              'rootLayout.screens.languageAnalysisModal.languageSearchCriteria',
            )}
            placeholderTextColor={
              isDark ? colors.charcoal[400] : colors.charcoal[500]
            }
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="ml-3 flex-1 text-base text-black dark:text-white"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="flex-1">
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName={
            filteredLanguages?.length > 0
              ? 'pb-[300px]'
              : 'flex-1 flex-column items-center justify-start mt-20'
          }
        >
          {filteredLanguages?.length > 0 ? (
            filteredLanguages.map((item) => (
              <View key={item.value}>{renderLanguageItem({ item })}</View>
            ))
          ) : (
            <>
              <SearchIcon
                width={48}
                height={48}
                color={isDark ? colors.white : colors.black}
              />
              <Text className="mt-4 text-center font-bold-nunito text-lg text-black dark:text-white/60">
                {translate(
                  'rootLayout.screens.languageAnalysisModal.noLanguageFound',
                )}
              </Text>
              <Text className="mt-2 text-center text-base text-black dark:text-white/60">
                {translate(
                  'rootLayout.screens.languageAnalysisModal.noLanguageFoundSubtitle',
                )}
              </Text>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default LanguageAnalysisContent;
