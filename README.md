# Workshop Navigator
> Recursive Turtles

## Table of Contents
- [Workshop Navigator](#workshop-navigator)
  - [Table of Contents](#table-of-contents)
  - [Mission Statement](#mission-statement)
  - [Features](#features)
    - [Summary](#summary)
    - [Users](#users)
    - [Core Features](#core-features)
    - [Pages/Endpoint Functionality](#pagesendpoint-functionality)
    - [Nice To Haves](#nice-to-haves)
  - [Technical Implementation](#technical-implementation)
    - [Back-End](#back-end)
    - [Front-End](#front-end)
    - [Git \& Deployment](#git--deployment)
  - [Target Audience](#target-audience)
  - [Back-end Implementation](#back-end-implementation)
    - [API Specification](#api-specification)
    - [Object Definitions](#object-definitions)
      - [Users](#users-1)
      - [Questions](#questions)
      - [Polls](#polls)
      - [Sessions](#sessions)
      - [Slide Access Requests](#slide-access-requests)
    - [Database Schema](#database-schema)
  - [Front-end Implementation](#front-end-implementation)
    - [Wireframes](#wireframes)
      - [Join Screen](#join-screen)
      - [Session Home](#session-home)
      - [Ask a Question](#ask-a-question)
      - [Get the Slides](#get-the-slides)
      - [Presenter Dashboard](#presenter-dashboard)
    - [Logo](#logo)
    - [Colours](#colours)
      - [Primary](#primary)
      - [Secondary](#secondary)
    - [Font](#font)

## Mission Statement

Workshop Navigator is a mobile-first presentation engagement tool designed to make presentations and workshops more interactive for Gen X and older corporate audiences. It supports participants who may be engaged but hesitant to speak up during live sessions by giving them a clear, low-friction way to interact on their phones.

The product allows attendees to join quickly via QR code or session link, respond to live polls, ask anonymous questions, and access Scott Millar’s presentation library after the event. On the presenter side, Workshop Navigator provides a simple dashboard for reviewing audience engagement, captured questions, and email interest for future follow-up and client reporting. The overall goal is to create a sleek, elegant, and accessible experience that feels professional, easy to use, and relevant in live workshop and keynote environments.

## Features

### Summary

Workshop Navigator provides guest participants the ability to join a live presentation session, answer polls, ask questions privately, and request access to presentation slides/resources from their mobile device. Presenters can monitor engagement, view responses, review submitted questions, and export session outcomes later.

### Users

| Type | Access | Role type assignment |
| :--- | :--- | :--- |
| Presenter/Admin | <br> - Full access <br> - Can log in <br> - Can create and manage sessions <br> - Can create polls <br> - Can review questions <br> - Can view captured emails <br> - Can export results | Scott Millar / admin team |
| Event Support / Approver | <br> - Can log in <br> - Can assist with session management <br> - Can view submitted questions and responses <br> - Can support presenter workflow | AV support / event support |
| Guest Participant | <br> - Can join via QR code or session link <br> - Can answer live polls <br> - Can ask questions with or without sharing name <br> - Can enter email to access presentation library | Public workshop/presentation attendees |

### Core Features

| Feature | Access | Notes/Conditions |
| :--- | :--- | :--- |
| Join Session | Guest | <br> - Access via QR code or session link <br> - No account required for MVP |
| Live Polls | Guest | <br> - Simple, easy-to-read response flow <br> - Mobile friendly |
| Ask a Question | Guest | <br> - Anonymous by default or optional name sharing <br> - Designed for low-pressure participation |
| Access Presentation Library | Guest | <br> - Email required <br> - Optional workshop updates toggle |
| Presenter Dashboard | Presenter/Admin | <br> - View participants, poll responses, questions, captured emails |
| Export Results | Presenter/Admin | <br> - Export session results and engagement data |
| Feedback Link | Guest | <br> - Optional and lightweight <br> - Can be offered after slide access flow |

### Pages/Endpoint Functionality

| Endpoint/Page | Functionality | Comments |
| :--- | :--- | :--- |
| Join Session | <br> - Join via QR code <br> - Join via session link | <br> - No workshop code required for MVP |
| Session Home | <br> - Presents main participant actions <br> - Live Poll <br> - Ask a Question <br> - Get the Slides | <br> - Text-first navigation for accessibility |
| Ask a Question | <br> - Submit question <br> - Optional name field <br> - Toggle to share name | <br> - Built for shy/passive audiences |
| Get the Slides | <br> - Enter email <br> - Toggle workshop updates on/off <br> - Access presentation library | <br> - Presentation library acts as the free value offer |
| Presenter Dashboard | <br> - View session metrics <br> - Review recent questions <br> - Export results | <br> - Simplified dashboard for MVP |

### Nice To Haves

- Word cloud feature
- Pre-event audience input
- Richer analytics and charts
- Session-specific client reports
- Better AV display support
- Canva-adjacent workflow improvements
- Expanded feedback flow
- Deeper question moderation tools

## Technical Implementation

### Back-End

- Django / Django REST Framework
- Python

### Front-End

- React
- JavaScript or TypeScript
- HTML/CSS

### Git & Deployment

- GitHub
- Netlify for front-end deployment
- Heroku or Render for back-end deployment

This application can be developed as two linked repositories: one for the front-end React app and one for the back-end DRF API.

## Target Audience

Workshop Navigator is primarily designed for Gen X and older professional users attending conferences, workshops, and keynote presentations. These users are familiar with mobile devices but often value usability, readability, and efficiency over trend-based or overly decorative interfaces.

The interface is designed to support people who may use reading glasses or prefer stronger contrast, larger buttons, and text-based navigation. The product is also designed for presenters such as Scott Millar, who need a streamlined way to encourage engagement, capture questions, and review session insights afterward. The result is a tool that supports both participant comfort and presenter usefulness in real-time event settings.

## Back-end Implementation

### API Specification

| HTTP Method | URL | Purpose | Request Body | Successful Response Code | Authentication and Authorization |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | /sessions/join | Join a live session via link or QR flow | `{ "session_link": "string" }` | 200 | Open access |
| GET | /sessions/:id | Get session details | N/A | 200 | Open access |
| GET | /sessions/:id/polls | Get live polls for a session | N/A | 200 | Open access |
| POST | /poll-responses | Submit poll response | `{ "poll": integer, "response": "string" }` | 201 | Open access |
| POST | /questions | Submit a question | `{ "session": integer, "question_text": "string", "name": "string", "share_name": boolean }` | 201 | Open access |
| GET | /questions?session=:id | View questions for session | N/A | 200 | Presenter/Admin |
| POST | /slide-access | Capture email and update preference | `{ "session": integer, "email": "string", "workshop_updates": boolean }` | 201 | Open access |
| GET | /dashboard/:session_id | View dashboard metrics | N/A | 200 | Presenter/Admin |
| GET | /dashboard/:session_id/export | Export results | N/A | 200 | Presenter/Admin |
| POST | /login | Presenter/admin login | `{ "username": "string", "password": "string" }` | 200 | Token auth |
| POST | /logout | Log out presenter/admin | N/A | 200 | Authenticated presenter/admin |

### Object Definitions

#### Users
| Field | Data type |
| :--- | :--- |
| User_ID (PK) | integer |
| Username | string |
| Email | string |
| Password | string |
| Role | string |
| Created_At | datetime |

#### Questions
| Field | Data type |
| :--- | :--- |
| Question_ID (PK) | integer |
| Session_ID (FK) | integer |
| Question_Text | string |
| Name | string |
| Share_Name | boolean |
| Created_At | datetime |

#### Polls
| Field | Data type |
| :--- | :--- |
| Poll_ID (PK) | integer |
| Session_ID (FK) | integer |
| Poll_Question | string |
| Poll_Type | string |
| Is_Live | boolean |

#### Sessions
| Field | Data type |
| :--- | :--- |
| Session_ID (PK) | integer |
| Title | string |
| Presenter_Name | string |
| Session_Link | string |
| Is_Live | boolean |
| Created_At | datetime |

#### Slide Access Requests
| Field | Data type |
| :--- | :--- |
| Access_ID (PK) | integer |
| Session_ID (FK) | integer |
| Email | string |
| Workshop_Updates | boolean |
| Created_At | datetime |

### Database Schema

![Database schema](./img/schema.png)

## Front-end Implementation

### Wireframes

#### Join Screen
![Join screen wireframe](./img/join-screen.png)

#### Session Home
![Session home wireframe](./img/session-home.png)

#### Ask a Question
![Ask a question wireframe](./img/ask-question.png)

#### Get the Slides
![Get the slides wireframe](./img/get-the-slides.png)

#### Presenter Dashboard
![Presenter dashboard wireframe](./img/presenter-dashboard.png)

### Logo

![Workshop Navigator logo](./img/logo.png)

### Colours

#### Primary

- Main background: `#0B1020`
- Surface 1: `#121933`
- Surface 2: `#1A2450`
- Primary Indigo: `#4F46E5`

#### Secondary

- Electric Blue: `#2563EB`
- Accent Purple: `#7C3AED`
- Text Primary: `#FFFFFF`
- Text Secondary: `#E5E7EB`
- Border: `#2A3D6B`

### Font

As a group decision, the project will use **Georgia** as the primary heading font.

Georgia was selected because it offers a polished, classic serif feel similar to Bookman Old Style while being much easier to use reliably in a coded application. It is widely available, readable on screens, and dependable across devices and browsers.

Suggested usage:
- **Headings:** Georgia, serif
- **Body text / buttons / form text:** Inter, Arial, sans-serif

```css
font-family: Georgia, "Times New Roman", serif;