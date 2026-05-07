# Windows 12 Mock UI

Un projet de prototype et de simulation pour un concept d'interface utilisateur de Windows 12, construit avec React, TypeScript, Vite, Zustand et Framer Motion.

## Fonctionnalités Implémentées
- **Boot Screen & Login:** Séquence de démarrage cinématique et écran de connexion.
- **Gestionnaire de fenêtres:** Fenêtres draggables (glisser-déposer), redimensionnables, avec gestion du z-index (focus).
- **Menu Démarrer:** Interface de style "glassmorphism" avec recherche et applications épinglées.
- **Barre des tâches:** Applications épinglées, applications actives, horloge système.
- **Applications Mock:** Navigateur Web (Edge Mock), Paramètres (Personnalisation du thème clair/sombre), Widget Météo.
- **Thème dynamique:** Mode sombre et mode clair gérés dynamiquement via CSS variables et Zustand.

---

## FINAL AUDIT

### Fichiers créés
- `src/store/useOSStore.ts` (State manager Zustand)
- `src/components/BootScreen.tsx`
- `src/components/LoginScreen.tsx`
- `src/components/Desktop/Desktop.tsx`
- `src/components/Desktop/StartMenu.tsx` (et .css)
- `src/components/Desktop/Taskbar.tsx` (et .css)
- `src/components/Window/WindowManager.tsx`
- `src/components/Window/Window.tsx` (et .css)
- `src/components/Window/Apps/BrowserMock.tsx`
- `src/components/Window/Apps/SettingsMock.tsx`
- `src/components/Window/Apps/WeatherMock.tsx`
- `src/index.css` (Mise à jour pour les variables globales de l'OS)

### Problèmes détectés
- Les imports de `lucide-react` posaient initialement des problèmes (ex: l'icône "Chrome" manquante a été remplacée par "Globe").
- Chemins relatifs TypeScript (`../../store...`) corrigés pour correspondre à la hiérarchie.
- Types TypeScript non respectés sur les imports (corrigé avec `import type`).

### Améliorations possibles
- Rendre les applications du menu Démarrer toutes cliquables (actuellement seulement quelques-unes sont gérées par le WindowManager).
- Ajouter la persistance du localStorage dans Zustand pour garder l'état entre les rechargements.
- Implémenter le comportement "Maximize" pour utiliser tout l'espace d'écran et empêcher le drag.
- Ajouter des animations plus avancées pour la minimisation vers la barre des tâches.

### Niveau de finition estimé
- **Visuel:** Élevé (Framer Motion + Glassmorphism).
- **Technique:** Propre (Pas d'erreurs TypeScript, architecture modulaire).
- **Fonctionnel:** Prototype jouable.

---

## AUTO FIX LOG
- **Passe 1:** Installation des packages manquants (`framer-motion`, `zustand`, `lucide-react`, `clsx`).
- **Passe 2:** Création de l'architecture de base, détection et correction d'une erreur d'icônes `Chrome` inexistante dans `lucide-react` remplacée par `Globe`.
- **Passe 3:** Correction des types TS dans `Window.tsx` (`AppWindow`) en utilisant `import type`.
- **Passe 4:** Correction du chemin d'import du store dans `SettingsMock.tsx`.

## QUALITY PASSES
- **Passe UI/UX:** Intégration de CSS Vanilla propre, utilisation de variables natives pour la bascule de thème.
- **Passe Architecturale:** Séparation stricte de la logique (Zustand) et de l'UI (Composants React isolés).
- **Passe TS/Lint:** Lancement de `tsc -b` et `vite build` avec succès final.

## KNOWN LIMITATIONS
- C'est une simulation frontend uniquement, pas de vrai backend ni de système de fichiers.
- Les dimensions de drag de fenêtres sont fixes (par rapport aux bornes du viewport) et pourraient avoir des comportements inattendus lors du redimensionnement de la fenêtre du navigateur principal.
- Le mock du navigateur est purement visuel (pas d'iframe réel par sécurité et simplicité).

## FINAL STABILITY REPORT
Le projet compile parfaitement (0 erreurs). L'architecture est stable, les tests de build passent. L'expérience de la simulation OS est fluide et sans bug visuel apparent. Le prototype Windows 12 est techniquement prêt pour de nouvelles expansions.
