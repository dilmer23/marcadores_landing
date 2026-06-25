import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Recuperar contraseña</h1>
          <p>Ingresá tu nueva contraseña</p>
        </div>

        <div *ngIf="error" class="auth-alert error">
          <span class="alert-icon">&#9888;</span>
          {{ error }}
        </div>

        <form *ngIf="showForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="input-group">
            <label for="password">Nueva contraseña</label>
            <input
              id="password"
              type="password"
              [(ngModel)]="newPassword"
              name="password"
              placeholder="••••••••"
              required
              autocomplete="new-password"
            />
          </div>
          <button type="submit" class="btn-primary">Actualizar contraseña</button>
        </form>

        <div *ngIf="success" class="auth-success">
          <div class="success-icon">&#10003;</div>
          <p>Contraseña actualizada correctamente</p>
          <p class="redirect-msg">Redirigiendo...</p>
        </div>

        <div *ngIf="!showForm && !success && !loading" class="auth-empty">
          <p>No se encontró un token de recuperación válido.</p>
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
    }
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .auth-header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0 0 .35rem;
    }
    .auth-header p {
      color: #6b7280;
      font-size: .95rem;
      margin: 0;
    }
    .auth-alert {
      display: flex;
      align-items: center;
      gap: .5rem;
      padding: .75rem 1rem;
      border-radius: 10px;
      font-size: .875rem;
      margin-bottom: 1.25rem;
    }
    .auth-alert.error {
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }
    .alert-icon { font-size: 1.1rem; }
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: .35rem;
    }
    .input-group label {
      font-size: .875rem;
      font-weight: 600;
      color: #374151;
    }
    .input-group input {
      padding: .75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      font-size: 1rem;
      outline: none;
      transition: border-color .2s, box-shadow .2s;
    }
    .input-group input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99,102,241,.15);
    }
    .btn-primary {
      padding: .8rem;
      background: #6366f1;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .2s;
    }
    .btn-primary:hover { background: #4f46e5; }
    .btn-primary:active { transform: scale(.98); }
    .auth-success {
      text-align: center;
      padding: 1rem 0;
    }
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
    .auth-empty {
      text-align: center;
      color: #9ca3af;
      padding: 1rem 0;
    }
    @media (max-width: 480px) {
      .auth-card { padding: 1.75rem; border-radius: 12px; }
      .auth-header h1 { font-size: 1.25rem; }
    }
  `]
})
export class ResetPasswordComponent implements OnInit {
  error: string | null = null;
  showForm = false;
  newPassword = '';
  success = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  loading = true;

  async ngOnInit() {
    const result = await this.supabase.handleAuthCallback();
    this.loading = false;

    if (result.error) {
      this.error = result.error;
      return;
    }

    if (result.type === 'recovery') {
      this.showForm = true;
    }
  }

  async onSubmit() {
    if (!this.newPassword) return;

    const { error } = await this.supabase.updatePassword(this.newPassword);
    if (error) {
      this.error = error.message;
      return;
    }

    this.success = true;
    setTimeout(() => this.router.navigate(['/']), 2000);
  }
}
