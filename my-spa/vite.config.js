import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // имя репозитория ↓ со слэшами по краям
  base: '/Hillel-HW-27.1/',
});
