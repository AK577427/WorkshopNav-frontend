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
    - [Pages / Functionality](#pages--functionality)
    - [Nice To Haves](#nice-to-haves)
  - [Technical Implementation](#technical-implementation)
    - [Back-End](#back-end)
    - [Front-End](#front-end)
    - [Git \& Deployment](#git--deployment)
  - [Target Audience](#target-audience)
  - [Back-End Implementation](#back-end-implementation)
    - [API Specification](#api-specification)
      - [Events](#events)
      - [Polls](#polls)
      - [Poll Responses](#poll-responses)
      - [Questions](#questions)
      - [Feedback](#feedback)
      - [Emails](#emails)
    - [Object Definitions](#object-definitions)
      - [Users](#users-1)
      - [Events](#events-1)
      - [Polls](#polls-1)
      - [Poll Responses](#poll-responses-1)
      - [Questions](#questions-1)
      - [Feedback](#feedback-1)
      - [Email Capture](#email-capture)
    - [Database Schema](#database-schema)
  - [Front-End Implementation](#front-end-implementation)
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

Workshop Navigator is a mobile-first presentation and workshop engagement tool designed to improve audience interaction and data collection during live events. It is intended for professional facilitators and keynote speakers, particularly Scott Millar, who want a simple and effective way to encourage participation from Gen X and older corporate audiences.

Many presentations and workshops suffer from low engagement because attendees are shy, passive, or hesitant to ask questions in front of colleagues or managers. Workshop Navigator reduces those barriers by allowing attendees to join instantly through a QR code or link, participate in live polls, submit anonymous questions, and access presentation resources after the session. Presenters can later review audience responses, questions, and engagement data through a dashboard and export results for future topic planning and client reporting.

The overall goal is to create a sleek, professional, easy-to-read interaction tool that supports live engagement without distracting from the presentation itself.

## Features

### Summary

Workshop Navigator is a real-time presentation engagement platform that allows attendees to:

- join instantly with no login
- participate in polls
- ask anonymous questions
- provide feedback
- share their email to receive presentation resources

Facilitators can:

- create and manage events
- run live polls
- view questions
- collect audience insights
- review and export results later

### Users

| Type | Access | Role |
| :--- | :--- | :--- |
| Facilitator / Admin | Full control | Creates events, runs sessions, views results, exports data |
| Event Support / Approver | Assists session delivery | Supports presenter workflow, views submitted questions and responses |
| Attendee | No login required | Joins event, interacts via mobile, submits questions and feedback |

### Core Features

| Feature | Access | Notes / Conditions |
| :--- | :--- | :--- |
| Join Event | Attendee | Join instantly via QR code or link |
| Live Polling | Attendee | Fast, simple, mobile-friendly responses |
| Anonymous Q&A | Attendee | Anonymous by default, with optional name entry |
| Feedback Collection | Attendee | Simple post-session rating and optional comment |
| Email Capture | Attendee | Optional email submission for slides/resources |
| Facilitator Dashboard | Facilitator / Admin | View questions, responses, emails, and event metrics |
| Export Results | Facilitator / Admin | Export results for reporting and review |

### Pages / Functionality

| Page | Function | Comments |
| :--- | :--- | :--- |
| Join Page | Enter event via QR code or link | No login required |
| Session Home | Main attendee actions | Live Poll, Ask a Question, Get the Slides |
| Ask a Question | Submit anonymous question | Optional name field and share-name toggle |
| Get the Slides | Enter email and request presentation resources | Optional workshop updates toggle |
| Dashboard | Facilitator session control and results view | Simplified MVP dashboard |
| Results Page | View poll and feedback results | Presenter-facing summary |

### Nice To Haves

- word clouds
- gamification
- advanced analytics dashboards
- user accounts
- live moderation tools
- pre-event attendee input
- Canva-adjacent workflow improvements

## Technical Implementation

### Back-End

- Django
- Django REST Framework
- SQLite for development
- optional PostgreSQL for production

### Front-End

- React (Vite)
- mobile-first design
- JavaScript or TypeScript
- Fetch or Axios for API calls

### Git & Deployment

- GitHub with 2 repositories:
  - front-end
  - back-end
- Back-end deployment: Heroku or Render
- Front-end deployment: Netlify

## Target Audience

The primary audience for Workshop Navigator is professional facilitators, keynote speakers, and workshop leaders delivering presentations to corporate teams, particularly senior managers and employees. The platform is designed for live event environments where audience engagement is important but often limited by hesitation, passivity, or the absence of simple digital tools.

It is also designed for attendees, who need a fast and accessible way to participate without creating an account or dealing with unnecessary friction. Because the product is aimed at Gen X and older professional audiences, the design prioritises readability, clear labels, visible buttons, and minimal technical barriers. The goal is to support confident participation for both confident and reluctant users.

## Back-End Implementation

### API Specification

#### Events
| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | /events | Create event | `{ "title": "string", "event_code": "string", "status": "string" }` | 201 | Facilitator / Admin |
| GET | /events/code/:code | Join event by code/link | N/A | 200 | Open access |
| GET | /events/:id | Get event details | N/A | 200 | Open access |

#### Polls
| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | /events/:id/polls | Create poll | `{ "question": "string", "options": [] }` | 201 | Facilitator / Admin |
| GET | /events/:id/polls | Get polls for event | N/A | 200 | Open access |

#### Poll Responses
| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | /polls/:id/responses | Submit response | `{ "response": "string" }` | 201 | Open access |

#### Questions
| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | /events/:id/questions | Submit question | `{ "text": "string", "name": "string", "anonymous": true }` | 201 | Open access |
| GET | /events/:id/questions | Get questions | N/A | 200 | Facilitator / Admin |
| POST | /questions/:id/upvote | Upvote question | N/A | 200 | Open access |

#### Feedback
| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | /events/:id/feedback | Submit feedback | `{ "rating": integer, "comment": "string" }` | 201 | Open access |

#### Emails
| HTTP Method | URL | Purpose | Request Body | Success Code | Authentication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | /events/:id/emails | Capture email | `{ "email": "string", "workshop_updates": boolean }` | 201 | Open access |

### Object Definitions

#### Users
| Field | Data Type |
| :--- | :--- |
| User_ID (PK) | integer |
| Username | string |
| Email | string |
| Password | string |
| Role | string |
| Created_At | datetime |

#### Events
| Field | Data Type |
| :--- | :--- |
| Event_ID (PK) | integer |
| Title | string |
| Event_Code | string |
| Status | string |
| Created_At | datetime |

#### Polls
| Field | Data Type |
| :--- | :--- |
| Poll_ID (PK) | integer |
| Event_ID (FK) | integer |
| Question | string |
| Options | array / JSON |
| Is_Live | boolean |

#### Poll Responses
| Field | Data Type |
| :--- | :--- |
| PollResponse_ID (PK) | integer |
| Poll_ID (FK) | integer |
| Response | string |
| Created_At | datetime |

#### Questions
| Field | Data Type |
| :--- | :--- |
| Question_ID (PK) | integer |
| Event_ID (FK) | integer |
| Text | string |
| Name | string |
| Anonymous | boolean |
| Upvotes | integer |
| Created_At | datetime |

#### Feedback
| Field | Data Type |
| :--- | :--- |
| Feedback_ID (PK) | integer |
| Event_ID (FK) | integer |
| Rating | integer |
| Comment | string |
| Created_At | datetime |

#### Email Capture
| Field | Data Type |
| :--- | :--- |
| EmailCapture_ID (PK) | integer |
| Event_ID (FK) | integer |
| Email | string |
| Workshop_Updates | boolean |
| Created_At | datetime |

### Database Schema

![Database schema](./img/schema.png)

## Front-End Implementation

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

- Main Background: `#101A3A`
- Surface 1: `#16234A`
- Surface 2: `#1D2D5C`
- Border / Outline: `#31457A`

#### Secondary

- BOP Pink: `#E75595`
- BOP Purple: `#8B57CC`
- BOP Cyan: `#50C6E8`
- Text Primary: `#FFFFFF`
- Text Secondary: `#E6ECF7`
- Text Muted: `#A6B4D0`

Additional colours may be expanded from the BOP Industries logo and website to support a more energetic, modern, and engaging visual system.

### Font

The preferred brand and display font is **Glacial Indifference**, as it aligns with Scott Millar’s existing site and visual identity.

If implementation constraints arise, suitable fallback fonts such as **Georgia**, **Inter**, or **Arial** may be used while preserving readability, accessibility, and brand consistency.

Suggested usage:

- **Headings / display text:** Glacial Indifference
- **Body text / buttons / form text:** Inter or Arial

Example fallback stack:

```css
font-family: "Glacial Indifference", Georgia, Inter, Arial, sans-serif;