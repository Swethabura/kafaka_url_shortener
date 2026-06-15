# Kafka URL Shortener

A URL Shortener built with **Node.js, TypeScript, MongoDB, Redis, and Kafka** to explore event-driven architecture, caching strategies, and asynchronous analytics processing.

Instead of storing click analytics directly during redirection, click events are published to Kafka and processed asynchronously by consumers. This keeps redirects fast while demonstrating real-world backend patterns.

---

## Features

### URL Management
- Generate short URLs
- Store URLs in MongoDB
- Redirect users using short codes

### Redis Caching
- Cache-Aside Pattern
- Faster URL lookup on repeated requests
- Reduced database reads

### Kafka Event Processing
- Publish click events through Kafka Producer
- Process analytics asynchronously using Kafka Consumers
- Separate consumer groups for different responsibilities

### Analytics
- Track total clicks
- Track unique visitors
- Track latest click timestamp
- Fetch analytics through API

### Production-Oriented Setup
- TypeScript
- Dockerized infrastructure
- Structured logging using Pino
- Global error handling
- Environment validation
- Request logging middleware

---

# Architecture

```text
                ┌─────────────┐
                │    User     │
                └──────┬──────┘
                       │
                       ▼

              POST /api/urls
                       │
                       ▼
                 MongoDB

──────────────────────────────────────

             GET /:shortCode
                       │
                       ▼

                   Redis
                Cache Hit?
                 /      \
               Yes      No
                │        │
                │     MongoDB
                │        │
                └────────┘
                       │
                       ▼
                 Redirect User
                       │
                       ▼
              Publish Click Event
                       │
                       ▼
                    Kafka
                       │
       ┌───────────────┴───────────────┐
       │                               │
       ▼                               ▼

 Analytics Consumer             Audit Consumer
       │                               │
       ▼                               ▼

 MongoDB Analytics              Logging / Replay
```

---

# Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- MongoDB

## Cache

- Redis

## Event Streaming

- Apache Kafka
- KafkaJS

## Logging

- Pino
- Pino Pretty

## Validation

- Zod

## Containerization

- Docker
- Docker Compose

---

# Project Structure

```text
src
├── config
├── controllers
├── kafka
│   ├── admin.ts
│   ├── producer.ts
│   ├── consumer.ts
│   ├── consumer2.ts
│   └── events.ts
├── middlewares
├── models
├── routes
├── services
├── utils
├── validators
├── app.ts
└── server.ts
```

---

# API Endpoints

## Create Short URL

### Request

```http
POST /api/urls/create
```

### Body

```json
{
  "originalUrl": "https://www.google.com"
}
```

### Response

```json
{
  "success": true,
  "message": "Short URL created successfully",
  "data": {
    "shortCode": "abc123"
  }
}
```

---

## Redirect URL

### Request

```http
GET /api/urls/:shortCode
```

### Example

```http
GET /api/urls/abc123
```

Redirects user to original URL.

---

## Analytics

### Request

```http
GET /api/analytics/:shortCode
```

### Response

```json
{
  "success": true,
  "message": "Analytics fetched successfully",
  "data": {
    "shortCode": "abc123",
    "totalClicks": 10,
    "uniqueVisitors": 2,
    "lastClickedAt": "2026-06-15T12:00:00.000Z"
  }
}
```

---

# Kafka Flow

### Producer

When a user accesses a short URL:

```text
User Click
    |
    ▼
Producer
    |
    ▼
url-clicks Topic
```

---

### Analytics Consumer Group

Consumes click events and stores analytics records.

```text
Kafka Topic
    |
    ▼
Analytics Consumer
    |
    ▼
MongoDB
```

---

### Audit Consumer Group

Consumes the same events independently for logging and replay demonstrations.

```text
Kafka Topic
    |
    ▼
Audit Consumer
    |
    ▼
Logs
```

---

# Kafka Concepts Explored

### Producers

Publishing click events to Kafka topics.

### Consumers

Listening to click events asynchronously.

### Consumer Groups

Separate processing pipelines using different group IDs.

### Offsets

Understanding how Kafka tracks message consumption.

### Event Replay

Reprocessing historical events by creating a new consumer group.

### Event-Driven Architecture

Decoupling analytics processing from user-facing redirects.

---

# Redis Cache Strategy

Implemented the Cache-Aside Pattern.

```text
Request
   |
   ▼

Redis
 Hit?
 /  \
Yes  No
 |    |
 |  MongoDB
 |    |
 └────┘
   |
   ▼
Response
```

Benefits:

- Faster response times
- Reduced database load
- Better scalability

---

# Environment Variables

```env
PORT=5000

MONGO_URI=mongodb://localhost:27018/url-shortener

REDIS_URL=redis://localhost:6381

KAFKA_BROKER=localhost:9093

KAFKA_CLIENT_ID=url-shortener

NODE_ENV=development
```

---

# Running Locally

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Start Infrastructure

```bash
docker compose up -d
```

### Start Development Server

```bash
npm run dev
```

---

# Learning Outcomes

Through this project I explored:

- Redis Cache-Aside Pattern
- Event-Driven Architecture
- Kafka Producers and Consumers
- Kafka Consumer Groups
- Kafka Offsets and Replay
- MongoDB Indexing and Query Optimization
- Dockerized Development Environment
- Structured Logging with Pino
- Environment Validation with Zod
- Express.js Project Structuring
- TypeScript Backend Development

---

# Future Improvements

- URL expiration support
- Rate limiting
- Click analytics dashboard
- Geographic analytics
- Dead Letter Queue (DLQ)
- Kafka retry strategy
- Metrics and monitoring
- Distributed cache invalidation

---

## Author

Built as a learning project to explore modern backend architecture patterns using Redis, Kafka, MongoDB, and TypeScript.
