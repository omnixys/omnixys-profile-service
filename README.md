# Omnixys Profile Service

![Build Status](https://img.shields.io/github/actions/workflow/status/omnixys/omnixys-profile-service/ci.yml?branch=main)
![License](https://img.shields.io/badge/license-GPLv3-blue.svg)
![Coverage](https://img.shields.io/codecov/c/github/omnixys/omnixys-profile-service)
![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/omnixys_omnixys-profile-service?server=https%3A%2F%2Fsonarcloud.io)

Das **Profile Service** ist ein Microservice innerhalb der **OmnixysSphere**-Plattform. Er verwaltet Benutzerprofile, Social-Features und deren Integration mit externen Systemen wie Keycloak und Kafka.

---

## 🚀 Features

* Eigene Profilseite: Name, Profilbild, Bio
* Social-Media-Integration: LinkedIn, Instagram, Twitter, Facebook
* Profile anderer Nutzer mit Aktionen: Folgen, Nachricht senden
* Feed für eigene Beiträge auf der Profilseite
* Folgen-/Entfolgen-Funktion
* Profileinstellungen inkl. Bild-Upload und Social-Links
* Keycloak-basierte Authentifizierung und Autorisierung
* Kafka-Integration für Events (z. B. Follow-Actions)
* Observability: OpenTelemetry, LoggerPlus, Prometheus-Metriken

---

## 📂 Projektstruktur

```
src/
├── admin/                  # Admin & Monitoring Endpunkte
├── config/                 # App-, Kafka-, DB-, Security- und OTEL-Konfiguration
├── health/                 # Healthchecks & Liveness/Readiness
├── kafka/                  # Kafka Producer, Consumer und Dispatcher
├── logger/                 # Logging & Middleware
├── observability/          # OpenTelemetry, TraceContext & LoggerPlus
├── profile/                # Kernmodul für Profile (Model, Resolver, Services)
└── security/               # Keycloak Integration & Guards
```

````
src/profile/
├── model/
│   ├── entity/
│   │   ├── profile.model.ts        # Öffentliche Profildaten
│   │   ├── post.model.ts           # Beiträge (Feed)
│   │   ├── follow.model.ts         # Follower-Beziehungen
│   │   └── user-settings.model.ts  # Private Einstellungen
│   ├── dto/
│   │   ├── create-post.input.ts
│   │   ├── update-profile.input.ts
│   │   ├── update-user-settings.input.ts
├── service/
│   ├── profile-read.service.ts
│   ├── profile-write.service.ts
│   ├── user-settings.service.ts
├── resolver/
│   ├── profile-query.resolver.ts
│   ├── profile-mutation.resolver.ts
│   └── user-settings.resolver.ts
└── upload/
    └── upload.controller.ts         # Media Upload Handling (Multer)
````

---

## 🛠️ Tech Stack

* **Backend:** NestJS + GraphQL (Code-First)
* **Auth:** Keycloak
* **DB:** MongoDB
* **Messaging:** Apache Kafka
* **Observability:** OpenTelemetry, Prometheus, Grafana

---

## 🔑 GraphQL API

### Queries

* `getProfile(username: String!)`
* `getFollowers(userId: ID!)`

### Mutations

* `updateProfile(input: ProfileInput!)`
* `followUser(userId: ID!)`
* `unfollowUser(userId: ID!)`

---

## ⚙️ Setup

### Lokal starten

```bash
npm install
npm run start:dev
```

### Mit Docker starten

```bash
docker build -t omnixys-profile-service .
docker run -p 7406:7406 --env-file .env omnixys-profile-service
```

---

## 🌍 Environment Variables

| Variable                | Beispielwert                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------- |
| NODE\_ENV               | development                                                                         |
| HTTPS                   | false                                                                               |
| MONGO\_DB\_DATABASE     | Profile                                                                             |
| MONGODB\_USER\_NAME     | <username>                                                                          |
| MONGODB\_USER\_PASSWORT | <password>                                                                          |
| MONGO\_DB\_URI          | mongodb+srv://<username>:<password>@<cluster-url>/<db>?retryWrites=true\&w=majority |
| CLIENT\_SECRET          | <client-secret>                                                                     |
| KEYS\_PATH              | ../../keys                                                                          |
| GRAPHQL\_SCHEMA         | true                                                                                |
| TEMPO\_URI              | [http://localhost:4318/v1/traces](http://localhost:4318/v1/traces)                  |

> ⚠️ **Hinweis:** Verwende niemals echte Secrets oder Passwörter in der Dokumentation oder im Code. Nutze `.env`-Dateien und sichere sie.

---

## 📊 Observability

* **Tracing:** OpenTelemetry + Tempo
* **Metrics:** Prometheus Endpoint `/metrics`
* **Logs:** JSON-Logs via LoggerPlus, zentralisiert über Kafka

---

## ✅ Nächste Schritte

1. UI-Integration für `/profile/[username]` im Next.js-Frontend
2. Feed-Anbindung mit Pagination
3. Erweiterung des Kafka-Eventmodells für Activity-Streams

---

## 📜 Lizenz

Dieses Modul ist lizenziert unter der [GNU GPL v3](../LICENSE).

© 2025 Omnixys – Modular Thinking. Infinite Possibilities.
