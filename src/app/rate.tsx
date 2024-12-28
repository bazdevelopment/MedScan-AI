import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

const Rate = () => {
  const handleFeedback = (isPositive: boolean) => {
    if (isPositive) {
      // Redirect happy users to the App Store
      const appStoreUrl = 'https://apps.apple.com/app/idYOUR_APP_ID'; // Replace with your App Store link
      Linking.openURL(appStoreUrl).catch((err) =>
        console.error('Error opening URL', err),
      );
    } else {
      // Redirect unhappy users to a Google Form
      const googleFormUrl = 'https://forms.gle/YOUR_GOOGLE_FORM_ID'; // Replace with your Google Form URL
      Linking.openURL(googleFormUrl).catch((err) =>
        console.error('Error opening URL', err),
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-5">
      <Text className="mb-5 text-center text-lg font-bold">
        Do you love using this app?
      </Text>

      {/* Positive Feedback Button */}
      <TouchableOpacity
        className="mb-4 rounded-md bg-blue-500 px-6 py-3"
        onPress={() => handleFeedback(true)}
      >
        <Text className="text-center text-lg text-white">Yes, I love it!</Text>
      </TouchableOpacity>

      {/* Negative Feedback Button */}
      <TouchableOpacity
        className="rounded-md bg-red-500 px-6 py-3"
        onPress={() => handleFeedback(false)}
      >
        <Text className="text-center text-lg text-white">Not really...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Rate;
