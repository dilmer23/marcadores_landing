import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="container">
        <img src="assets/img/logo.png" alt="Marcadores" class="logo" />
        <nav class="nav">
          <a href="#features">Características</a>
          <a href="#cta">Empezar</a>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-content">
        <h1>Tus marcadores, <span class="gradient-text">siempre contigo</span></h1>
        <p>Guardá, organizá y accedé a tus enlaces favoritos desde cualquier dispositivo. Rápido, simple y seguro.</p>
        <a href="#cta" class="btn-primary">Comenzá gratis</a>
      </div>
    </section>

    <section id="features" class="features">
      <div class="container">
        <h2>Todo lo que necesitás</h2>
        <div class="features-grid">
          <div class="feature-card" *ngFor="let f of features">
            <div class="feature-icon">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="cta" class="cta">
      <div class="container">
        <h2>Empezá a organizar tus enlaces</h2>
        <p>Registrate gratis y llevá tus marcadores a todas partes.</p>
        <a href="#" class="btn-primary btn-large">Crear cuenta gratis</a>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2026 Marcadores. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :host { display: block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a2e; }

    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(255,255,255,.8); backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,.06);
    }
    .header .container {
      display: flex; align-items: center; justify-content: space-between;
      height: 64px;
    }
    .logo { height: 36px; width: auto; }
    .nav { display: flex; gap: 24px; }
    .nav a { text-decoration: none; color: #6b7280; font-size: .9rem; font-weight: 500; transition: color .2s; }
    .nav a:hover { color: #6366f1; }

    .hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center; overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fdf2f8 100%);
    }
    .hero-content { position: relative; text-align: center; padding: 120px 0 80px; }
    .hero-content h1 {
      font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800;
      line-height: 1.15; margin-bottom: 20px;
    }
    .gradient-text {
      background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-content p {
      font-size: 1.15rem; color: #6b7280; max-width: 520px;
      margin: 0 auto 36px; line-height: 1.6;
    }
    .btn-primary {
      display: inline-block; padding: 14px 36px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff; text-decoration: none; border-radius: 12px;
      font-weight: 600; font-size: 1rem;
      transition: transform .2s, box-shadow .2s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,.35); }

    .features { padding: 100px 0; background: #fff; }
    .features h2 { text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 48px; }
    .features-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    .feature-card {
      padding: 32px; border-radius: 16px;
      border: 1px solid #f3f4f6; transition: transform .2s, box-shadow .2s;
    }
    .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.06); }
    .feature-icon { font-size: 2rem; margin-bottom: 12px; }
    .feature-card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; }
    .feature-card p { font-size: .9rem; color: #6b7280; line-height: 1.6; margin: 0; }

    .cta {
      padding: 100px 0; text-align: center;
      background: linear-gradient(135deg, #eef2ff, #f5f3ff);
    }
    .cta h2 { font-size: 2rem; font-weight: 700; margin-bottom: 12px; }
    .cta p { color: #6b7280; margin-bottom: 32px; font-size: 1.05rem; }
    .btn-large { padding: 16px 44px; font-size: 1.1rem; }

    .footer { padding: 32px 0; text-align: center; color: #9ca3af; font-size: .85rem; }

    @media (max-width: 640px) {
      .hero-content h1 { font-size: 2rem; }
      .hero-content p { font-size: 1rem; }
      .features { padding: 60px 0; }
      .features h2 { font-size: 1.5rem; }
      .cta { padding: 60px 0; }
      .cta h2 { font-size: 1.5rem; }
    }
  `]
})
export class LandingComponent {
  features = [
    { icon: '🔖', title: 'Guardado rápido', desc: 'Guardá cualquier enlace con un clic. Organizalo al instante.' },
    { icon: '📁', title: 'Carpetas inteligentes', desc: 'Agrupá tus marcadores por temas con carpetas y etiquetas.' },
    { icon: '☁️', title: 'Sincronización cloud', desc: 'Accedé desde cualquier dispositivo, siempre actualizado.' },
    { icon: '🔍', title: 'Búsqueda instantánea', desc: 'Encontrá cualquier marcador al instante con búsqueda full-text.' },
    { icon: '📱', title: 'Multi-dispositivo', desc: 'Disponible en web, tablet y móvil. Llevá todo con vos.' },
    { icon: '🔒', title: 'Privacidad total', desc: 'Tus datos encriptados. Solo vos tenés acceso a tus marcadores.' },
  ];
}
