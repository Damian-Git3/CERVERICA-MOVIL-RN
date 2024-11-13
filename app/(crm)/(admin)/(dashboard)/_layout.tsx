import { Stack } from "expo-router";

const DashboardLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default DashboardLayout;
