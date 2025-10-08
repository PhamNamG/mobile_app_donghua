/**
 * API Layer Barrel Export
 * 
 * This module provides two API client options:
 * 
 * 1. Axios-based client (from './config/api.config')
 *    - Default export: configured axios instance
 *    - Use for complex requests with interceptors
 *    - Automatically returns response.data
 * 
 * 2. Fetch-based client (from './client')
 *    - Named exports: get, post, put, patch, del
 *    - Use for simple requests
 *    - Native fetch API with auth support
 * 
 * Both clients:
 * - Automatically attach auth tokens from secure storage
 * - Handle 401 unauthorized by clearing tokens
 * - Support all HTTP methods
 */

// Axios client (recommended for most use cases)
export { default as api } from './config/api.config';

// Fetch-based client
export * from './client';

// Services
export * from './services';

// Types
export type { ApiResponse, ApiError } from './client';










