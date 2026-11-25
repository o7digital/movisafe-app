# Movisafe Control

Mockup interactif en espagnol pour présenter à Vincent une application client et une console de monitoring, avec catalogue de services, demandes de devis, acomptes simulés et abonnements mensuels.

## Lancer la preview

Depuis le dossier contenant ce README, exécuter avec Python 3 installé

```bash
python3 -m http.server 8080 --directory web --bind 127.0.0.1
```

Sur Windows, utiliser `py -m http.server 8080 --directory web --bind 127.0.0.1`.

- Dashboard — http://localhost:8080/#control
- App client — http://localhost:8080/#app
- Catalogue — http://localhost:8080/#servicios
- Demandes et devis — http://localhost:8080/#solicitudes
- Abonnements — http://localhost:8080/#ingresos

Arrêter le serveur avec Ctrl+C. L'application est statique et fonctionne sans installation de dépendances ni compilation.

Le fichier `Movisafe_Control_Demo.html` offre également une version autonome avec les images et les polices intégrées. L'ouvrir dans un navigateur qui exécute JavaScript. Le code à modifier se trouve dans `web/`. Une modification de ces sources nécessite de régénérer la version autonome pour qu'elle reflète les changements.

## Contenu

| Fichier | Utilité |
| --- | --- |
| `web/index.html` | Entrée de l'application |
| `web/styles.css` | Identité visuelle, dashboard et mise en page mobile |
| `web/data.js` | Catalogue, plans, données fictives et état de démonstration |
| `web/app.js` | Écrans, navigation et interactions |
| `web/assets/` | Logo Movisafe, photos, fond de carte et polices locales |
| `INSTRUCTIONS_CODEX.md` | Consignes pour reprendre le projet |
| `Movisafe_Control_Demo.html` | Démo autonome à présenter |

## Parcours à montrer

1. Dans l'app client, maintenir SOS pendant deux secondes.
2. Dans Alertas, attribuer l'alerte à un opérateur et la résoudre avec une note.
3. Dans l'app client, demander un service et renseigner sa date et sa zone.
4. Dans Solicitudes, établir le devis et son pourcentage d'acompte.
5. Dans l'app client, accepter le devis et confirmer l'acompte simulé.
6. Dans Operaciones, attribuer la mission créée, démarrer puis terminer la prestation.
7. Choisir un plan dans Mi plan et consulter le revenu mensuel simulé dans Suscripciones.

La Guía de demostración permet de remettre à zéro les données du navigateur.

## Fonctionnement actuel

Les données sont stockées dans le navigateur sous la clé `movisafe-control-v1`. Les deux vues partagent cet état sur une même origine, y compris entre onglets du même navigateur. Des appareils distincts ont chacun leurs données. L'ouverture du fichier autonome et la version servie sur localhost peuvent aussi avoir des états distincts.

Les comptes et noms sont fictifs. La carte est une image locale. Le trajet animé suit des points prédéfinis. Le SOS crée une alerte locale. Les paiements et abonnements mettent à jour des données de démonstration. L'interface mobile constitue le mockup de l'app. Les applications natives, l'authentification, le backend, le GPS réel, les notifications et les encaissements restent à développer.

Les tarifs de 490, 1 490 et 3 900 MXN par mois, ainsi que les montants des prestations et acomptes, sont des propositions de présentation à valider avec Vincent.

## Ressources

L'identité et les photos proviennent de https://movisafe.com/ fourni pour ce projet. Le catalogue reprend ses rubriques prévention, protection, conseil et formation, complétées par la demande de protection rapprochée. Le fond cartographique provient du service World Dark Gray Base d'Esri et conserve son attribution dans l'interface. Les polices locales sont OpenAI Sans. Vérifier les droits de redistribution des ressources avant exploitation commerciale et remplacer celles qui le nécessitent.

Pour un hébergement statique, servir le contenu de `web/` à la racine du site. Les routes utilisent des fragments `#`, sans réécriture serveur.

## Build et tests Firefox

La preview reste utilisable avec Python seul. Pour le build reproductible et les tests, utiliser Node.js 22 ou ultérieur :

```bash
npm ci
npx playwright install firefox
npm run build
npm test
```

Le build contrôle la syntaxe, régénère `Movisafe_Control_Demo.html` avec ses ressources intégrées et prépare le site statique dans `dist/`. La configuration `vercel.json` utilise ce dossier. Aucun backend ni paiement réel n'est ajouté.

Les tests démarrent leur propre serveur local et vérifient les routes à 1440, 390 et 430 pixels, les images et polices locales, le SOS par appui long et confirmation clavier, l'attribution et la résolution d'alerte entre onglets, la demande de service, le devis, l'acompte et l'unicité de la mission, son exécution, les abonnements et leur revenu mensuel, la pause de localisation, la persistance et la remise à zéro. Un test vérifie aussi la démo autonome hors connexion. Les captures sont enregistrées dans `test-results/` (non versionné).

Pour vérifier le site déployé avec les mêmes parcours simulés :

```bash
BASE_URL=https://votre-projet.vercel.app npm test
```
