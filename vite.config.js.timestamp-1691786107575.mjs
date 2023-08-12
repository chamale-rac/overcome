// vite.config.js
import { defineConfig } from "file:///D:/JDgomez/Git/ing_soft_2/overcome/node_modules/vite/dist/node/index.js";
import react from "file:///D:/JDgomez/Git/ing_soft_2/overcome/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\JDgomez\\Git\\ing_soft_2\\overcome";
var vite_config_default = defineConfig({
  server: {
    host: "127.0.0.1",
    port: 4444
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") },
      { find: "@assets", replacement: path.resolve(__vite_injected_original_dirname, "src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__vite_injected_original_dirname, "src/components")
      },
      { find: "@context", replacement: path.resolve(__vite_injected_original_dirname, "src/context") },
      { find: "@data", replacement: path.resolve(__vite_injected_original_dirname, "src/data") },
      {
        find: "@features",
        replacement: path.resolve(__vite_injected_original_dirname, "src/features")
      },
      { find: "@hooks", replacement: path.resolve(__vite_injected_original_dirname, "src/hooks") },
      { find: "@layouts", replacement: path.resolve(__vite_injected_original_dirname, "src/layouts") },
      { find: "@lib", replacement: path.resolve(__vite_injected_original_dirname, "src/lib") },
      { find: "@pages", replacement: path.resolve(__vite_injected_original_dirname, "src/pages") },
      { find: "@routes", replacement: path.resolve(__vite_injected_original_dirname, "src/routes") },
      {
        find: "@services",
        replacement: path.resolve(__vite_injected_original_dirname, "src/services")
      },
      { find: "@utils", replacement: path.resolve(__vite_injected_original_dirname, "src/utils") },
      { find: "@config", replacement: path.resolve(__vite_injected_original_dirname, "src/config") },
      { find: "@store", replacement: path.resolve(__vite_injected_original_dirname, "src/store") },
      { find: "@context", replacement: path.resolve(__vite_injected_original_dirname, "src/context") },
      { find: "@schemas", replacement: path.resolve(__vite_injected_original_dirname, "src/schemas") },
      { find: "@api", replacement: path.resolve(__vite_injected_original_dirname, "src/api") }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxKRGdvbWV6XFxcXEdpdFxcXFxpbmdfc29mdF8yXFxcXG92ZXJjb21lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxKRGdvbWV6XFxcXEdpdFxcXFxpbmdfc29mdF8yXFxcXG92ZXJjb21lXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9KRGdvbWV6L0dpdC9pbmdfc29mdF8yL292ZXJjb21lL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuLy8gZG9jczo6IGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiAnMTI3LjAuMC4xJyxcclxuICAgIHBvcnQ6IDQ0NDQsXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IFtcclxuICAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfSxcclxuICAgICAgeyBmaW5kOiAnQGFzc2V0cycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnQGNvbXBvbmVudHMnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcclxuICAgICAgfSxcclxuICAgICAgeyBmaW5kOiAnQGNvbnRleHQnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250ZXh0JykgfSxcclxuICAgICAgeyBmaW5kOiAnQGRhdGEnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9kYXRhJykgfSxcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6ICdAZmVhdHVyZXMnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2ZlYXR1cmVzJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bob29rcycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2hvb2tzJykgfSxcclxuICAgICAgeyBmaW5kOiAnQGxheW91dHMnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9sYXlvdXRzJykgfSxcclxuICAgICAgeyBmaW5kOiAnQGxpYicsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xpYicpIH0sXHJcbiAgICAgIHsgZmluZDogJ0BwYWdlcycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJykgfSxcclxuICAgICAgeyBmaW5kOiAnQHJvdXRlcycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3JvdXRlcycpIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnQHNlcnZpY2VzJyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zZXJ2aWNlcycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7IGZpbmQ6ICdAdXRpbHMnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscycpIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bjb25maWcnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb25maWcnKSB9LFxyXG4gICAgICB7IGZpbmQ6ICdAc3RvcmUnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zdG9yZScpIH0sXHJcbiAgICAgIHsgZmluZDogJ0Bjb250ZXh0JywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29udGV4dCcpIH0sXHJcbiAgICAgIHsgZmluZDogJ0BzY2hlbWFzJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc2NoZW1hcycpIH0sXHJcbiAgICAgIHsgZmluZDogJ0BhcGknLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hcGknKSB9LFxyXG4gICAgXSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtTLFNBQVMsb0JBQW9CO0FBQy9ULE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sS0FBSyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLLEVBQUU7QUFBQSxNQUN6RCxFQUFFLE1BQU0sV0FBVyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxZQUFZLEVBQUU7QUFBQSxNQUN0RTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDdkQ7QUFBQSxNQUNBLEVBQUUsTUFBTSxZQUFZLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGFBQWEsRUFBRTtBQUFBLE1BQ3hFLEVBQUUsTUFBTSxTQUFTLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFVBQVUsRUFBRTtBQUFBLE1BQ2xFO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDckQ7QUFBQSxNQUNBLEVBQUUsTUFBTSxVQUFVLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFdBQVcsRUFBRTtBQUFBLE1BQ3BFLEVBQUUsTUFBTSxZQUFZLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGFBQWEsRUFBRTtBQUFBLE1BQ3hFLEVBQUUsTUFBTSxRQUFRLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFNBQVMsRUFBRTtBQUFBLE1BQ2hFLEVBQUUsTUFBTSxVQUFVLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFdBQVcsRUFBRTtBQUFBLE1BQ3BFLEVBQUUsTUFBTSxXQUFXLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFlBQVksRUFBRTtBQUFBLE1BQ3RFO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDckQ7QUFBQSxNQUNBLEVBQUUsTUFBTSxVQUFVLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFdBQVcsRUFBRTtBQUFBLE1BQ3BFLEVBQUUsTUFBTSxXQUFXLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFlBQVksRUFBRTtBQUFBLE1BQ3RFLEVBQUUsTUFBTSxVQUFVLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFdBQVcsRUFBRTtBQUFBLE1BQ3BFLEVBQUUsTUFBTSxZQUFZLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGFBQWEsRUFBRTtBQUFBLE1BQ3hFLEVBQUUsTUFBTSxZQUFZLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGFBQWEsRUFBRTtBQUFBLE1BQ3hFLEVBQUUsTUFBTSxRQUFRLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFNBQVMsRUFBRTtBQUFBLElBQ2xFO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
