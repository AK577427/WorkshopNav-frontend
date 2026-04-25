# Workshop Navigator

> Recursive Turtles

## Table of Contents

- [Workshop Navigator](#workshop-navigator)
  - [Mission Statement](#mission-statement)
  - [Features](#features)
    - [Summary](#summary)
    - [Users](#users)
    - [Core Features](#core-features)
    - [Pages / Endpoint Functionality](#pages--endpoint-functionality)
    - [Nice To Haves](#nice-to-haves)
  - [Technical Implementation](#technical-implementation)
    - [Back-End](#back-end)
    - [Front-End](#front-end)
    - [Git & Deployment](#git--deployment)
  - [Target Audience](#target-audience)
  - [Back-End Implementation](#back-end-implementation)
    - [API Specification](#api-specification)
    - [Object Definitions](#object-definitions)
    - [Database Schema](#database-schema)
  - [Front-End Implementation](#front-end-implementation)
    - [Wireframes](#wireframes)
    - [Logo](#logo)
    - [Colours](#colours)
    - [Font](#font)

---

## Mission Statement

Workshop Navigator is a mobile-first presentation engagement tool designed to make presentations and workshops more interactive for Gen X and older corporate audiences. It supports participants who may be engaged but hesitant to speak up during live sessions by giving them a clear, low-friction way to interact on their phones.

The product allows attendees to join quickly via QR code or session link, respond to live polls, ask anonymous questions, and access Scott Millar’s presentation library after the event.

On the presenter side, Workshop Navigator provides a simple dashboard for reviewing audience engagement, captured questions, and email interest for future follow-up and client reporting.

The overall goal is to create a sleek, elegant, and accessible experience that feels professional, easy to use, and relevant in live workshop and keynote environments.

---

## Features

### Summary

Workshop Navigator provides guest participants the ability to join a live presentation session, answer polls, ask questions privately, and request access to presentation slides/resources from their mobile device.

Presenters can monitor engagement, view responses, review submitted questions, and export session outcomes later.

---

### Users

| Type | Access | Role Type Assignment |
| :--- | :--- | :--- |
| Presenter/Admin | Full access. Can log in, create and manage sessions, create polls, review questions, view captured emails, and export results. | Scott Millar / admin team |
| Event Support / Approver | Can log in, assist with session management, view submitted questions and responses, and support presenter workflow. | AV support / event support |
| Guest Participant | Can join via QR code or session link, answer live polls, ask questions with or without sharing their name, and enter an email to access the presentation library. | Public workshop / presentation attendees |

---

### Core Features

| Feature | Access | Notes / Conditions |
| :--- | :--- | :--- |
| Join Session | Guest | Access via QR code or session link. No account required for MVP. |
| Live Polls | Guest | Simple, easy-to-read response flow. Mobile friendly. |
| Ask a Question | Guest | Anonymous by default, with optional name sharing. Designed for low-pressure participation. |
| Access Presentation Library | Guest | Email required. Optional workshop updates toggle. |
| Presenter Dashboard | Presenter/Admin | View participants, poll responses, questions, and captured emails. |
| Export Results | Presenter/Admin | Export session results and engagement data. |
| Feedback Link | Guest | Optional and lightweight. Can be offered after slide access flow. |

---

### Pages / Endpoint Functionality

| Endpoint / Page | Functionality | Comments |
| :--- | :--- | :--- |
| Join Session | Join via QR code or session link. | No workshop code required for MVP. |
| Session Home | Presents main participant actions: Live Poll, Ask a Question, and Get the Slides. | Text-first navigation for accessibility. |
| Ask a Question | Submit a question with an optional name field and a toggle to share name. | Built for shy or passive audiences. |
| Get the Slides | Enter email, choose workshop updates on/off, and access presentation library. | Presentation library acts as the free value offer. |
| Presenter Dashboard | View session metrics, review recent questions, and export results. | Simplified dashboard for MVP. |

---

### Nice To Haves

- Word cloud feature
- Pre-event audience input
- Richer analytics and charts
- Session-specific client reports
- Better AV display support
- Canva-adjacent workflow improvements
- Expanded feedback flow
- Deeper question moderation tools

---

## Technical Implementation

### Back-End

- Django
- Django REST Framework
- Python

### Front-End

- React
- JavaScript or TypeScript
- HTML
- CSS

### Git & Deployment

- GitHub
- Netlify for front-end deployment
- Heroku or Render for back-end deployment

This application can be developed as two linked repositories: one for the front-end React app and one for the back-end Django REST Framework API.

---

## Target Audience

Workshop Navigator is primarily designed for Gen X and older professional users attending conferences, workshops, and keynote presentations.

These users are familiar with mobile devices but often value usability, readability, and efficiency over trend-based or overly decorative interfaces.

The interface is designed to support people who may use reading glasses or prefer stronger contrast, larger buttons, and text-based navigation.

The product is also designed for presenters such as Scott Millar, who need a streamlined way to encourage engagement, capture questions, and review session insights afterward.

The result is a tool that supports both participant comfort and presenter usefulness in real-time event settings.

---

## Back-End Implementation

### API Specification

| HTTP Method | URL | Purpose | Request Body | Successful Response Code | Authentication and Authorization |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | `/sessions/join` | Join a live session via link or QR flow | `{ "session_link": "string" }` | 200 | Open access |
| GET | `/sessions/:id` | Get session details | N/A | 200 | Open access |
| GET | `/sessions/:id/polls` | Get live polls for a session | N/A | 200 | Open access |
| POST | `/poll-responses` | Submit poll response | `{ "poll": integer, "response": "string" }` | 201 | Open access |
| POST | `/questions` | Submit a question | `{ "session": integer, "question_text": "string", "name": "string", "share_name": boolean }` | 201 | Open access |
| GET | `/questions?session=:id` | View questions for session | N/A | 200 | Presenter/Admin |
| POST | `/slide-access` | Capture email and update preference | `{ "session": integer, "email": "string", "workshop_updates": boolean }` | 201 | Open access |
| GET | `/dashboard/:session_id` | View dashboard metrics | N/A | 200 | Presenter/Admin |
| GET | `/dashboard/:session_id/export` | Export results | N/A | 200 | Presenter/Admin |
| POST | `/login` | Presenter/admin login | `{ "username": "string", "password": "string" }` | 200 | Token auth |
| POST | `/logout` | Log out presenter/admin | N/A | 200 | Authenticated presenter/admin |

---

## Object Definitions

### Users

| Field | Data Type |
| :--- | :--- |
| User_ID (PK) | integer |
| Username | string |
| Email | string |
| Password | string |
| Role | string |
| Created_At | datetime |

---

### Questions

| Field | Data Type |
| :--- | :--- |
| Question_ID (PK) | integer |
| Session_ID (FK) | integer |
| Question_Text | string |
| Name | string |
| Share_Name | boolean |
| Created_At | datetime |

---

### Polls

| Field | Data Type |
| :--- | :--- |
| Poll_ID (PK) | integer |
| Session_ID (FK) | integer |
| Poll_Question | string |
| Poll_Type | string |
| Is_Live | boolean |

---

### Sessions

| Field | Data Type |
| :--- | :--- |
| Session_ID (PK) | integer |
| Title | string |
| Presenter_Name | string |
| Session_Link | string |
| Is_Live | boolean |
| Created_At | datetime |

---

### Slide Access Requests

| Field | Data Type |
| :--- | :--- |
| Access_ID (PK) | integer |
| Session_ID (FK) | integer |
| Email | string |
| Workshop_Updates | boolean |
| Created_At | datetime |

---

## Database Schema

Add your database schema image inside an `img` folder and use the path below:

```md
![Database schema](./img/schema.png)