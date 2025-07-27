# 📌 Omnixys Social Profile Module

Dieses Modul implementiert die **Social-Network-Funktionalität** ähnlich wie LinkedIn, Instagram und Twitter für die OmnixysSphere-Plattform.

---

## ✅ Features

✔ **Eigenes Profil**

* Profilübersicht: Name, Bio, Profilbild, Links
* Tabs: Beiträge, Über mich, Kontakte
* Einstellungen (Privacy, Sichtbarkeit, Blockierte Nutzer)

✔ **Andere Profile ansehen**

* Buttons: Folgen, Nachricht, Freund hinzufügen
* Gemeinsame Freunde anzeigen

✔ **Feed (Startseite)**

* Beiträge von Followern & Freunden
* Likes, Kommentare, Teilen
* Pagination & Sortierung

✔ **Follow-System**

* Folgen / Entfolgen
* Follower- & Following-Liste
* Benachrichtigung bei neuem Follower

✔ **Posts & Interaktionen**

* Erstellen von Posts (Text, Bilder)
* Like, Kommentar, Teilen

✔ **Datenschutz & Einstellungen**

* Profil-Privacy
* Blockierte Nutzer

---

## 🛠 Tech Stack

* **Framework:** NestJS (GraphQL API)
* **Frontend:** Next.js (App Router)
* **DB:** PostgreSQL / MongoDB (je nach Service)
* **Auth:** Keycloak
* **CI/CD:** GitHub Actions
* **Observability:** Tempo + Loki + Prometheus

---

## 🔑 GraphQL-Schema (Beispiel)

```graphql
type Query {
  getOwnProfile: Profile
  getProfileByUsername(username: String!): Profile
  getFeedPosts(page: Int, limit: Int): [Post]
}

type Mutation {
  followUser(targetId: ID!): Boolean
  unfollowUser(targetId: ID!): Boolean
  createPost(input: PostInput!): Post
}
```

---

## 📂 Projektstruktur

```
src/
├── entities/
│   ├── profile.entity.ts
│   ├── follow.entity.ts
├── resolvers/
│   ├── profile-query.resolver.ts
│   ├── profile-mutation.resolver.ts
├── services/
│   ├── profile-read.service.ts
│   ├── profile-write.service.ts
```

---

## 🚀 Nächste Schritte

* [ ] **Feed-Optimierung** (Ranking)
* [ ] **Benachrichtigungssystem** (Kafka)
* [ ] **Medien-Upload** (Bilder/Videos)
