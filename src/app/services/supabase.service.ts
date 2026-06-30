import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private _supabase: SupabaseClient;

  constructor() {
    this._supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  get supabase() {
    return this._supabase;
  }

  async handleAuthCallback(): Promise<{ type: string | null; error: string | null }> {
    const queryParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));

    const type = hashParams.get('type') || queryParams.get('type');

    // Implicit flow (hash)
    const hashToken = hashParams.get('access_token');
    if (hashToken) {
      const { error } = await this._supabase.auth.setSession({
        access_token: hashToken,
        refresh_token: hashParams.get('refresh_token') || '',
      });
      if (!error) window.location.hash = '';
      return { type, error: error?.message || null };
    }

    // PKCE flow (query code)
    const code = queryParams.get('code') || queryParams.get('auth_code');
    if (code) {
      if (queryParams.get('error')) return { type, error: queryParams.get('error_description') || 'Error en verificación' };
      const { error } = await this._supabase.auth.exchangeCodeForSession(code);
      return { type, error: error?.message || null };
    }

    return { type: null, error: null };
  }

  async updatePassword(password: string) {
    return this._supabase.auth.updateUser({ password });
  }

  async sendResetPasswordEmail(email: string) {
    const baseUrl = environment.production
      ? 'https://dilmer23.github.io/marcadores_landing'
      : 'http://localhost:4200';

    return this._supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/auth/reset-password`,
    });
  }
}
