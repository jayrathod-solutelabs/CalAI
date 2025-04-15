import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the profile data structure
export interface ProfileData {
  gender?: string;
  goal?: string;
  targetWeight?: number;
  dietaryPreferences?: string[];
  activityLevel?: string;
  workoutFrequency?: string;
  usedPreviousApps?: string;
  diet?: string;
  accomplishment?: string;

}

// Define the context interface
interface ProfileContextType {
  profileData: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  clearProfile: () => void;
}

// Create the context with a default value
const ProfileContext = createContext<ProfileContextType>({
  profileData: {},
  updateProfile: () => {},
  clearProfile: () => {},
});

// Create a provider component
export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>({});

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const clearProfile = () => {
    setProfileData({});
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Create a custom hook to use the profile context
export const useProfile = () => useContext(ProfileContext);

export default ProfileContext; 