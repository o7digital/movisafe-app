# Instructions pour Codex

## Message à donner à Codex

```text
Ouvre ce projet Movisafe Control et lis README.md puis INSTRUCTIONS_CODEX.md.
Lance la preview à partir du dossier web, vérifie le dashboard et l'app mobile,
puis teste le parcours SOS et le parcours demande de service, devis, acompte
simulé et mission. Utilise cette version comme référence pour la suite.
Respecte le logo Movisafe, la direction visuelle premium sombre, les accents
menthe et l'interface en espagnol. Présente-moi la preview et le résultat des
vérifications. Pour les évolutions, applique le périmètre demandé dans ma
conversation avec toi.
```

## Objectif produit

Vincent dirige une société de sécurité et souhaite commercialiser une protection mensuelle pour particuliers, familles et entreprises, puis faciliter l'achat de prestations complémentaires. Le client doit pouvoir solliciter l'équipe depuis son téléphone. La centrale doit gérer les alertes, le suivi, les missions, les demandes commerciales et les abonnements.

L'expérience fournie comprend deux vues reliées par un état local de démonstration. L'accès libre entre ces vues sert à la présentation. Une version opérationnelle devra appliquer des autorisations côté serveur à chaque rôle.

## Prise en main du code

1. Exécuter la commande de lancement du README.
2. Lire `web/data.js` pour comprendre les services, plans, utilisateurs fictifs, alertes et structures de données.
3. Lire `web/app.js` pour les parcours et `web/styles.css` pour les composants et breakpoints.
4. Conserver le fonctionnement des routes et des parcours lors des modifications demandées. Réutiliser les composants existants.
5. Tester les changements sur ordinateur et aux largeurs mobiles de 390 et 430 pixels, ainsi qu'au clavier pour les formulaires et modales.

## Vérifications fonctionnelles

- Un appui long sur SOS crée une seule alerte. Un clic simple propose une confirmation accessible.
- La centrale peut attribuer l'alerte, puis la résoudre avec une note. L'état se reflète côté client.
- La pause de localisation retire le marqueur du client et termine son éventuel trajet. Le démarrage d'un trajet avec localisation désactivée demande l'accord du client.
- Une demande de service apparaît dans la centrale et dans les demandes du client.
- La cotation accepte un total et un pourcentage d'acompte. L'acceptation simulée crée une seule mission et comptabilise l'acompte une seule fois.
- La mission peut passer de programmée à en cours puis terminée.
- Le changement d'abonnement actualise le plan client et le total mensuel du dashboard.
- Un rechargement conserve les changements lorsque le stockage du navigateur est disponible. La remise à zéro rétablit les données fictives.
- Les champs de saisie échappent le texte utilisateur lors de son affichage. Vérifier que les modifications préservent cette propriété.

Pour contrôler la syntaxe avec Node installé

```bash
node --check web/data.js
node --check web/app.js
```

## Direction visuelle et commerciale

Utiliser le logo fourni dans `web/assets/movisafe.svg`. L'interface est en espagnol du Mexique et les prix s'affichent en MXN. Les quatre éléments centraux sont le SOS, les alertes prioritaires, les services à réserver et les abonnements.

Le catalogue contient treize prestations. Il couvre les transferts VIP, la protection exécutive, la formation, les expatriés, le centre de réaction, le monitoring, l'intelligence de sécurité, l'étude de personnel, l'audit et la gestion de crise, la logistique et le conseil.

Les prix affichés servent à la discussion avec Vincent. Prévoir qu'il puisse les paramétrer lors du développement de la gestion commerciale.

## Passage à une application opérationnelle

Cette section décrit les évolutions à implémenter lorsque l'utilisateur demande la version opérationnelle. Le mockup doit d'abord rester facilement présentable.

### Backend et droits d'accès

Choisir l'architecture en fonction du dépôt et de l'infrastructure retenue par Olivier. Ajouter une base persistante et une API avec rôles client, opérateur et administrateur. Isoler les données par client ou entreprise. Appliquer les contrôles d'accès côté serveur. Prévoir des migrations, des journaux d'audit et des sauvegardes.

### Monitoring et traitement des alertes

Relier la position à une source GPS autorisée par le client, avec date de dernière réception, précision et état de connexion. Utiliser un fournisseur cartographique adapté à la production. Prévoir la livraison et l'accusé de réception des SOS, les reprises après coupure, la déduplication et la notification à l'équipe. L'affichage doit distinguer une alerte en attente d'envoi d'une alerte effectivement reçue par la centrale.

Pour le suivi en arrière-plan sur iOS et Android, déterminer les composants natifs nécessaires selon les exigences retenues. Prévoir le consentement et les commandes de pause du partage de position, ainsi que les états de batterie et de connectivité utiles aux opérateurs.

### Gestion des prestations

Rendre administrables le catalogue, les zones, les disponibilités, les prix, les devis, les équipes et les missions. Conserver le parcours réservation, acompte, affectation et suivi. Les liens destinés au client devront identifier une demande autorisée côté serveur.

### Paiements et abonnements

Connecter le prestataire choisi par Olivier et Vincent. Utiliser un checkout hébergé et vérifier les notifications serveur du prestataire. Dédupliquer les événements de paiement, créer une seule mission par confirmation et gérer les échecs, renouvellements, annulations, soldes et remboursements selon les règles métier retenues. Associer les forfaits à leurs bénéficiaires réels et calculer les revenus à partir des abonnements effectivement actifs.

### Livraison

Fournir les commandes de lancement et de build correspondant à l'architecture choisie, les variables d'environnement documentées sans secrets, les migrations et le résultat des tests des parcours concernés. Séparer les données de démonstration des données opérationnelles. Suivre les instructions de déploiement données par Olivier pour le domaine et l'environnement cibles.
