// src/app/app.config.ts

// --- TUS IMPORTS ACTUALES ---
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core'; // Se añade importProvidersFrom
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http'; // Se añade HttpClient
import { provideAnimations } from "@angular/platform-browser/animations";
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

// --- NUEVOS IMPORTS PARA NGX-TRANSLATE ---
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// --- NUEVA FUNCIÓN NECESARIA PARA NGX-TRANSLATE ---
// Esta función le dice a la librería dónde encontrar tus archivos de traducción (en.json, es.json)
export function HttpLoaderFactory(http: HttpClient) {
  // La ruta 'assets/i18n/' es correcta para tu estructura de carpetas
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// --- TU CONFIGURACIÓN ACTUALIZADA ---
export const appConfig: ApplicationConfig = {
  providers: [
    // Tus providers actuales
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: false}},

    // --- NUEVO PROVIDER PARA NGX-TRANSLATE ---
    // Esto es lo que resuelve el error "NullInjectorError: No provider for TranslateStore!"
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient] // Le decimos que necesita HttpClient para funcionar
        },
        defaultLanguage: 'es' // Establece 'español' como el idioma por defecto
      })
    )
  ]
};
