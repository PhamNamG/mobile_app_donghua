/**
 * Authentication Hook
 * Provides auth state and methods
 */

import { useState, useEffect, useCallback } from 'react';
import { TokenStorage } from '@/lib/storage';
import { router } from 'expo-router';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Check if user is authenticated
   */
  const checkAuth = useCallback(async () => {
    try {
      const token = await TokenStorage.get();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login with token
   */
  const login = useCallback(async (token: string) => {
    try {
      await TokenStorage.save(token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Error saving token:', error);
      return false;
    }
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      await TokenStorage.remove();
      setIsAuthenticated(false);
      router.replace('/(tabs)');
      return true;
    } catch (error) {
      console.error('Error removing token:', error);
      return false;
    }
  }, []);

  /**
   * Get current token
   */
  const getToken = useCallback(async () => {
    try {
      return await TokenStorage.get();
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    getToken,
    checkAuth,
  };
}

