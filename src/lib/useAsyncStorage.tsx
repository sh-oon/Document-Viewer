import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AsyncStorageHook<T> = [T | null, (value: T) => Promise<void>, () => Promise<void>];

function useAsyncStorage<T>(key: string, initialValue: T | null = null): AsyncStorageHook<T> {
  const [storedValue, setStoredValue] = useState<T | null>(initialValue);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setStoredValue(JSON.parse(value));
        }
      } catch (error) {
        console.error(`Failed to load ${key} from AsyncStorage`, error);
      }
    };

    loadStoredValue();
  }, [key]);

  const setValue = async (value: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error(`Failed to set ${key} in AsyncStorage`, error);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error(`Failed to remove ${key} from AsyncStorage`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}

export default useAsyncStorage;
