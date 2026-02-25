import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { DependencyProvider } from './infrastructure/di/DependencyContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DependencyProvider>
            <App />
        </DependencyProvider>
    </StrictMode>,
);