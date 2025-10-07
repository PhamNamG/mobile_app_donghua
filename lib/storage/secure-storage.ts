/**
 * Secure Storage Utility for React Native
 * Uses expo-secure-store for sensitive data (tokens)
 */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const SecureStorage = {
  /**
   * Save a value securely
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        // Fallback to localStorage on web
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get a value securely
   */
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        // Fallback to localStorage on web
        return localStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  /**
   * Remove a value
   */
  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  },

  /**
   * Clear all stored values
   */
  async clear(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.clear();
      } else {
        // Note: expo-secure-store doesn't have a clear all method
        // You need to track keys and delete them individually
        console.warn('Clear all is not available on native platforms');
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

/**
 * Token Management
 */
export const TokenStorage = {
  key: 'auth_token',

  async save(token: string): Promise<void> {
    return SecureStorage.setItem(this.key, token);
  },

  async get(): Promise<string | null> {
    return SecureStorage.getItem(this.key);
  },

  async remove(): Promise<void> {
    return SecureStorage.removeItem(this.key);
  },
};

