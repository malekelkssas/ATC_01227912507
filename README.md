# 🦆 QuackSeats

**QuackSeats** is a full-stack event booking platform where users can discover and reserve events, manage their bookings, and admins can oversee everything through a sleek web-based dashboard.

## Features

* 🎟️ Seamless event browsing & booking
* 🧾 Personal booking management
* 🛠️ Admin panel for event control
* 🧩 Scalable and modern stack

## Tech Stack

* **Frontend:** React
* **Backend:** Node.js / Express
* **Database:** MongoDB
* **Deployment:** 

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
