/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Toaster } from 'sonner-native';
import { twMerge } from 'tailwind-merge';

import {
  useConversation,
  useConversationHistory,
} from '@/api/conversation/conversation.hooks';
import { useUser } from '@/api/user/user.hooks';
import AttachmentPreview from '@/components/attachment-preview';
import BounceLoader from '@/components/bounce-loader';
import Branding from '@/components/branding';
import Icon from '@/components/icon';
import Toast from '@/components/toast';
import { LOADING_MESSAGES_CHATBOT } from '@/constants/loading-messages';
import { DEVICE_TYPE, translate } from '@/core';
import useBackHandler from '@/core/hooks/use-back-handler';
import { useTextToSpeech } from '@/core/hooks/use-text-to-speech';
import { checkIsVideo } from '@/core/utilities/check-is-video';
import { generateUniqueId } from '@/core/utilities/generate-unique-id';
import { wait } from '@/core/utilities/wait';
import { colors, Text } from '@/ui';
import { CloseIcon, SoundOn, StopIcon } from '@/ui/assets/icons';

type MessageType = {
  role: string;
  content: string;
  isPending?: boolean;
  isError?: boolean;
};

export const ChatBubble = ({
  message,
  isUser,
  onRetrySendMessage,
  speak,
  isSpeaking,
}: {
  message: MessageType;
  isUser: boolean;
  onRetrySendMessage: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
        className={twMerge(
          'py-3 my-1 rounded-2xl flex-row items-end',
          isUser
            ? 'px-4 bg-primary-900 dark:bg-primary-900 self-end rounded-tr-none'
            : 'pr-1 bg-slate-100 dark:bg-black self-start rounded-tl-none mr-[30]',
          message.isError && 'bg-red-100',
        )}
      >
        {!isUser && (
          <Image
            source={require('../ui/assets/images/assistant-avatar.png')}
            className="mr-2 h-8 w-8 self-start rounded-full"
          />
        )}
        <Text
          className={twMerge(
            'text-base',
            isUser ? 'text-white' : 'text-gray-800 dark:text-white',
            message.isError && 'text-red-800',
          )}
        >
          {message.content}
        </Text>
        {message.isPending && !isUser && <TypingIndicator />}

        {/* {isUser && (
          <Image
            source={require('../ui/assets/images/avatar.png')}
            className="ml-2 h-8 w-8 self-start rounded-full"
          />
        )} */}
      </Animated.View>
      <View className="item-center mt-1 flex-row gap-1">
        {!isUser && !!speak && (
          <View className="h-9">
            {isSpeaking ? (
              <TouchableOpacity onPress={() => speak(message.content)}>
                <StopIcon
                  width={22}
                  height={22}
                  top={5}
                  color={colors.primary[900]}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => speak(message.content)}>
                <SoundOn width={22} height={22} />
              </TouchableOpacity>
            )}
          </View>
        )}
        {isSpeaking && !isUser && (
          <LottieView
            source={require('assets/lottie/speaking-animation.json')}
            autoPlay
            loop
            style={{ width: 80, height: 30 }}
          />
        )}

        {message.isError && (
          <TouchableOpacity
            className="ml-2 flex-1 flex-row justify-end  gap-1"
            onPress={onRetrySendMessage}
          >
            <Text className="mt-1 text-xs text-red-500">
              {translate('general.tryAgain')}
            </Text>
            <Ionicons name="refresh-circle" size={24} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export const TypingIndicator = () => {
  return (
    <LottieView
      source={require('assets/lottie/typing-loader-animation.json')}
      autoPlay
      loop
      style={{ width: 80, height: 80, marginLeft: -15, top: -25 }}
    />
  );
};

const ChatScreen = () => {
  const {
    conversationId = generateUniqueId(),
    mediaSource,
    mimeType,
    conversationMode,
  } = useLocalSearchParams();
  const [userMessage, setUserMessage] = useState('');
  const [pendingMessages, setPendingMessages] = useState<MessageType[]>([]);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(
    null,
  );
  const [lastUserMessageIndex, setLastUserMessageIndex] = useState<
    number | null
  >(null);
  const isVideo = checkIsVideo(mimeType as string);

  const flashListRef = useRef<FlashList<MessageType>>(null);

  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
  } = useTextToSpeech({
    preferredGender: 'female',
  });

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    i18n: { language },
  } = useTranslation();
  const { data: userInfo } = useUser(language);

  const { data: conversation, isLoading } = useConversationHistory(
    conversationId as string,
  );
  const { sendMessage, isSending } = useConversation(conversationId as string);

  const handleSpeak = (messageId: string, text: string) => {
    if (currentlySpeakingId === messageId) {
      setCurrentlySpeakingId(null);
      speak(text);
      wait(50).then(() => stopSpeaking()); //hack to be able to stop the speech when navigating throught different messages
    } else {
      setCurrentlySpeakingId(messageId);
      stopSpeaking();
      speak(text);
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    setUserMessage('');
    Keyboard.dismiss();

    // Add the message to pending messages
    const newMessage: MessageType = {
      role: 'user',
      content: userMessage,
      isPending: true,
    };
    setPendingMessages((prev) => [...prev, newMessage]);

    // Store the index of the user's message
    setLastUserMessageIndex(messages.length);

    try {
      await sendMessage({
        userMessage,
        conversationId: conversationId as string,
        conversationMode,
        userId: userInfo.userId,
        language,
      });
      // Remove the pending message and add it to the conversation
      setPendingMessages((prev) =>
        prev.filter((msg) => msg.content !== newMessage.content),
      );
    } catch (error) {
      console.error('Error sending message:', error);
      // Mark the message as failed
      setPendingMessages((prev) =>
        prev.map((msg) =>
          msg.content === newMessage.content
            ? { ...msg, isPending: false, isError: true }
            : msg,
        ),
      );
    }
  };

  const handleRetryMessage = async (message: MessageType) => {
    try {
      // Mark the message as pending again
      setPendingMessages((prev) =>
        prev.map((msg) =>
          msg.content === message.content
            ? { ...msg, isPending: true, isError: false }
            : msg,
        ),
      );

      await sendMessage({
        userMessage: message.content,
        conversationId: conversationId as string,
        conversationMode,
        userId: userInfo.userId,
        language,
      });

      // Remove the pending message and add it to the conversation
      setPendingMessages((prev) =>
        prev.filter((msg) => msg.content !== message.content),
      );
    } catch (error) {
      console.error('Error retrying message:', error);
      // Mark the message as failed again
      setPendingMessages((prev) =>
        prev.map((msg) =>
          msg.content === message.content
            ? { ...msg, isPending: false, isError: true }
            : msg,
        ),
      );
    }
  };

  // Combine conversation messages and pending messages
  interface ConversationMessage {
    role: string;
    content: string;
  }
  const messages: MessageType[] = useMemo(
    () => [
      ...(conversation?.messages?.filter(
        (msg: ConversationMessage) => !Array.isArray(msg.content),
      ) || []),
      ...pendingMessages,
    ],
    [conversation?.messages, pendingMessages],
  );

  useBackHandler(() => true);

  // Scroll logic based on the number of messages
  useEffect(() => {
    if (messages.length && flashListRef.current) {
      setTimeout(() => {
        if (lastUserMessageIndex !== null) {
          // Scroll to the user's question
          flashListRef.current?.scrollToIndex({
            index: lastUserMessageIndex,
            animated: true,
            viewPosition: 0, // Align the top of the item with the top of the list
          });
        } else {
          // If there's only one message, scroll to the top
          flashListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }
      }, 100);
    }
  }, [messages, lastUserMessageIndex]);

  // Scroll to bottom when keyboard appears
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        flashListRef.current?.scrollToOffset({
          offset: 100000,
          animated: true,
        });
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && conversationMode === 'IMAGE_SCAN_CONVERSATION') {
      Toast.warning(translate('alerts.medicalDisclaimerAlert'), {
        closeButton: true,
        duration: 8000,
      });
    }
  }, [isLoading, conversationMode]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-blackEerie">
        <Branding isLogoVisible invertedColors />
        <ActivityIndicator
          size="large"
          className="my-6 items-center justify-center"
          color={isDark ? colors.charcoal[300] : colors.charcoal[100]}
        />
        <BounceLoader
          loadingMessages={LOADING_MESSAGES_CHATBOT}
          textClassName="text-black dark:text-white"
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-blackEerie">
      {DEVICE_TYPE.IOS && (
        <Toaster autoWiggleOnUpdate="toast-change" pauseWhenPageIsHidden />
      )}
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
        keyboardVerticalOffset={DEVICE_TYPE.ANDROID ? 40 : 0}
      >
        <View className="flex-1 bg-white dark:bg-blackEerie">
          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-600 dark:bg-blackEerie">
            <Icon
              size={20}
              containerStyle="rounded-full bg-blackEerie p-1"
              onPress={() => {
                stopSpeaking();
                router.push('/(tabs)/');
              }}
              icon={<CloseIcon color={colors.white} />}
            />
            <View className="item-center justify-center">
              <Text className="ml-2 font-bold-nunito text-xl dark:text-white">
                Aria
              </Text>
              {isSending ? (
                <Text className="ml-2 text-xs text-gray-500 dark:text-white">
                  {translate('general.typing')}
                </Text>
              ) : (
                <View className="flex-row items-center gap-2">
                  <View className="h-2 w-2 rounded-full bg-success-400" />
                  <Text className="text-xs text-gray-500 dark:text-white">
                    {translate('general.online')}
                  </Text>
                </View>
              )}
            </View>
            <View>
              {!!mediaSource && (
                <AttachmentPreview
                  filePath={mediaSource as string}
                  isVideo={isVideo}
                  className="h-[40px] w-[40px] rounded-xl border-0"
                  isEntirelyClickable
                />
              )}
            </View>
          </View>

          {/* Messages List */}
          <FlashList
            ref={flashListRef}
            data={messages}
            extraData={isSpeaking}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 8,
            }}
            renderItem={({ item, index }) => (
              <ChatBubble
                message={item}
                isUser={item.role === 'user'}
                onRetrySendMessage={() => handleRetryMessage(item)}
                speak={(text) => handleSpeak(index.toString(), text)}
                isSpeaking={currentlySpeakingId === index.toString()}
              />
            )}
            estimatedItemSize={100}
            ListFooterComponent={isSending ? <TypingIndicator /> : null}
          />

          {/* Input Area */}
          <View className="border-t border-gray-200 bg-white px-4 pb-2 pt-4 dark:border-blackEerie dark:bg-blackEerie">
            <View className="flex-row items-center rounded-full bg-gray-100 px-4 py-1 dark:bg-black ">
              <TextInput
                className="flex-1 py-2 text-base text-gray-800 dark:text-white"
                value={userMessage}
                onChangeText={setUserMessage}
                placeholder={translate('general.chatbotPlaceholder')}
                placeholderTextColor={isDark ? colors.charcoal[300] : '#9CA3AF'}
                multiline
                maxLength={150}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={isSending || !userMessage.trim()}
                className={twMerge(
                  'ml-2 p-2 rounded-full',
                  userMessage.trim()
                    ? 'bg-blue-500 dark:bg-primary-900'
                    : 'bg-gray-300 dark:bg-charcoal-400',
                )}
              >
                <Ionicons name="send" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
