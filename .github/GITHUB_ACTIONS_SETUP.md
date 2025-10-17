# 🚀 Configuration GitHub Actions pour EAS Build

## 📋 Prérequis

### 1. Créer un token Expo
1. Allez sur https://expo.dev/accounts/[your-account]/settings/access-tokens
2. Cliquez sur "Create Token"
3. Nom : `GITHUB_ACTIONS_TOKEN`
4. Copiez le token généré

### 2. Ajouter le token aux secrets GitHub
1. Allez sur votre repo : https://github.com/can2025/moroccocan
2. Cliquez sur **Settings** > **Secrets and variables** > **Actions**
3. Cliquez sur **New repository secret**
4. Name: `EXPO_TOKEN`
5. Value: Collez le token Expo créé à l'étape 1
6. Cliquez sur **Add secret**

## 🎯 Lancer un build

### Méthode 1 : Via l'interface GitHub (RECOMMANDÉ)
1. Allez sur https://github.com/can2025/moroccocan/actions
2. Cliquez sur "EAS Build Android" dans la liste de gauche
3. Cliquez sur "Run workflow" (bouton bleu à droite)
4. Choisissez :
   - **Platform**: `android`
   - **Profile**: `production`
5. Cliquez sur "Run workflow" (vert)
6. Attendez quelques secondes, puis rafraîchissez la page
7. Le build apparaîtra dans la liste
8. Une fois terminé, allez sur https://expo.dev pour télécharger votre AAB

### Méthode 2 : Via la ligne de commande (optionnel)
```bash
# Depuis votre terminal local
gh workflow run eas-build-android.yml -f platform=android -f profile=production
```

## 📝 Configuration actuelle

### app.json
- **Version**: 1.3.3
- **Version Code**: 19
- **Package**: com.afcon2025.morocco

### eas.json
- **App Version Source**: local (utilise app.json)
- **Profile production**: Configuration pour Google Play

## ✅ Avantages de cette solution

1. **Pas de quota local** : GitHub Actions a son propre quota (2000 minutes/mois gratuit)
2. **Build cloud** : Utilise les serveurs EAS d'Expo
3. **Signature correcte** : EAS gère automatiquement la signature avec votre keystore
4. **Reproductible** : Chaque build utilise la même configuration
5. **Historique** : Tous les builds sont trackés dans GitHub Actions

## 🔍 Vérifier le statut du build

1. **GitHub Actions** : https://github.com/can2025/moroccocan/actions
2. **Expo Dashboard** : https://expo.dev/accounts/[your-account]/projects/bolt-expo-nativewind/builds

## 📥 Télécharger l'AAB

Une fois le build terminé sur Expo :
1. Allez sur https://expo.dev
2. Sélectionnez votre projet "CAN 2025"
3. Cliquez sur "Builds"
4. Trouvez votre dernier build Android
5. Cliquez sur "Download" pour télécharger l'AAB
6. Uploadez l'AAB sur Google Play Console

## 🐛 Troubleshooting

### "Error: EXPO_TOKEN is not set"
→ Vérifiez que vous avez bien ajouté le secret `EXPO_TOKEN` dans GitHub

### "Build failed: EAS quota exceeded"
→ Le quota EAS global est atteint. Attendez le 1er novembre 2025 ou passez à un plan payant

### "Invalid credentials"
→ Vérifiez que votre token Expo n'a pas expiré : https://expo.dev/accounts/[your-account]/settings/access-tokens

## 📚 Ressources

- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Expo GitHub Action](https://github.com/expo/expo-github-action)
