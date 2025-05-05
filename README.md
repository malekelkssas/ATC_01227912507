# 🦆 QuackSeats

**QuackSeats** is a full-stack event booking platform where users can discover and reserve events, manage their bookings, and admins can oversee everything through a sleek web-based dashboard.

## Features

* event browsing & booking
* Personal booking management
* Admin panel for event control
* Fully responsive across devices
* Dark mode toggle support & A duck-themed loyalty badge system!
* Multi-language support (English, Arabic)

## 🧱 Tech Stack

| Layer      | Tech                                                 |
| ---------- | ---------------------------------------------------- |
| Frontend   | React + Tailwind CSS + DaisyUI + **Redux Toolkit** |
| Backend    | Node.js + Express                                    |
| Database   | MongoDB (via Mongoose)                               |
| Auth       | JWT-based auth with role support                     |
| Deployment | **AWS (EC2)**        |


## Data Schema/Models
4. 
```mermaid
erDiagram
    USER {
        string _id
        string name
        string email
        string password
        string role
    }

    EVENT {
        string _id
        string name
        string description
        string category
        string venue
        string imageUrl
        number price
        date date
    }

    BOOKING {
        string _id
        string userId
        string eventId
        date bookedAt
    }

    TAG {
        string _id
        string name
        string color
    }

    EVENT_TAG {
        string eventId
        string tagId
    }

    USER ||--o{ BOOKING : makes
    EVENT ||--o{ BOOKING : is_for
    EVENT ||--o{ EVENT_TAG : has
    TAG ||--o{ EVENT_TAG : used_in
```

---

## 🗂️ Backend Structure

The backend follows a clean, scalable architecture:

```
src/
├── controllers/   # Handle HTTP requests & responses
├── models/        # Mongoose schemas & models
├── routes/        # API endpoint definitions
├── services/      # Business logic layer
├── repository/    # Data access layer (DB queries & operations)
├── middlewares/   # (Optional) Auth, error handling, etc.
├── utils/         # Reusable helpers & contatns
├── config/        # Configuration & DB setup
├── types/         # Shared TypeScript types & interfaces
└── index.js       # Entry point for Express app
```
