import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]" // Dynamically matches "/scan-interpretation/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
