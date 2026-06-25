import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private _supabase: SupabaseClient;

  constructor() {
    this._supabase = createClient(
      'https://gdqfcrwhfceodrnzcdxk.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkcWZjcndoZmNlb2RybnpjZHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MTk3NTEsImV4cCI6MjA5NzE5NTc1MX0.l6tAFbQn8G7m3tXZil_LpgwiREFQTYsALRQp4slWt90'
    );
  }

  get supabase() {
    return this._supabase;
  }

  async handleAuthCallback(): Promise<{ type: string | null; error: string | null }> {
    // Intenta desde el hash (implicit flow)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const hashToken = hashParams.get('access_token');
    const type = hashParams.get('type') || new URLSearchParams(window.location.search).get('type');

    if (hashToken) {
      const { error } = await this._supabase.auth.setSession({
        access_token: hashToken,
        refresh_token: hashParams.get('refresh_token') || '',
      });
      if (!error) window.location.hash = '';
      return { type, error: error?.message || null };
    }

    // Intenta desde query (PKCE flow)
    const queryParams = new URLSearchParams(window.location.search);
    const authCode = queryParams.get('auth_code');
    if (authCode) {
      if (queryParams.get('error')) return { type, error: queryParams.get('error_description') || 'Error en verificación' };
      const { error } = await this._supabase.auth.exchangeCodeForSession(authCode);
      return { type, error: error?.message || null };
    }

    return { type: null, error: null };
  }

  async updatePassword(password: string) {
    return this._supabase.auth.updateUser({ password });
  }
}
