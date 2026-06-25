import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Confirmar email</h1>
        </div>

        <div *ngIf="loading" class="auth-loading">
          <div class="spinner"></div>
          <p>Verificando tu email...</p>
        </div>

        <div *ngIf="error" class="auth-alert error">
          <span class="alert-icon">&#9888;</span>
          {{ error }}
        </div>

        <div *ngIf="success" class="auth-success">
          <div class="success-icon">&#10003;</div>
          <p>Email confirmado correctamente</p>
          <p class="redirect-msg">Redirigiendo...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: #f5f7fa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .auth-card {
      background: #fff;
      border-radius: 16px;
      padding: 2.5rem;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 4px 24px rgba(0,0,0,.08);
      text-align: center;
    }
    .auth-header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0 0 2rem;
    }
    .auth-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
    }
    .auth-loading p { color: #6b7280; margin: 0; }
    .spinner {
      width: 36px;
      height: 36px;
      border: 3px solid #e5e7eb;
      border-top-color: #6366f1;
      border-radius: 50%;
      animation: spin .7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .auth-alert {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      padding: .75rem 1rem;
      border-radius: 10px;
      font-size: .875rem;
    }
    .auth-alert.error {
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }
    .alert-icon { font-size: 1.1rem; }
    .auth-success { padding: .5rem 0; }
    .success-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #d1fae5;
      color: #059669;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 auto 1rem;
    }
    .auth-success p { margin: 0; color: #374151; }
    .redirect-msg { font-size: .85rem; color: #9ca3af; margin-top: .5rem !important; }
    @media (max-width: 480px) {
      .auth-card { padding: 1.75rem; border-radius: 12px; }
      .auth-header h1 { font-size: 1.25rem; }
    }
  `]
})
export class ConfirmEmailComponent implements OnInit {
  loading = true;
  error: string | null = null;
  success = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    const result = await this.supabase.handleAuthCallback();

    this.loading = false;

    if (result.error) {
      this.error = result.error;
      return;
    }

    this.success = true;
    setTimeout(() => this.router.navigate(['/']), 2000);
  }
}
