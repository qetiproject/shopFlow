import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'send-reset-otp', renderMode: RenderMode.Prerender },
  { path: 'reset-password', renderMode: RenderMode.Prerender },
  { path: 'users', renderMode: RenderMode.Server },
  { path: 'users/**', renderMode: RenderMode.Server },
  { path: 'product', renderMode: RenderMode.Server },
  { path: 'product/**', renderMode: RenderMode.Server },
  { path: 'cart', renderMode: RenderMode.Server },
  { path: 'cart/**', renderMode: RenderMode.Server },
  { path: 'checkout', renderMode: RenderMode.Server },
  { path: 'checkout/**', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender },
];
