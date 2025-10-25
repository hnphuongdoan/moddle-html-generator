This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Moodle HTML Generator

A Next.js (v13+ App Router, TypeScript) web application that allows users to generate HTML5 + JS + inline CSS snippets designed for use inside Moodle LMS.

> 👤 Student: **Nguyen Phuong Doan Ho**  
> 🆔 Student Number: **21210670**  
> 📚 Subject: CSE3CWA / CSE5006 – Web App Development  
> 🏫 Institution: La Trobe University

---

## 🎯 Project Purpose

This application allows educators and developers to quickly generate HTML5 components (like Tabs) with embedded JavaScript and inline CSS that can be copied and pasted directly into Moodle LMS pages.

---

## ✨ Features

- 🧩 **Tabs Generator** – create up to 15 dynamic tab elements with custom content
- 🌗 **Dark / Light Theme Toggle** – user preference stored with `next-themes`
- 🍔 **Responsive Hamburger Menu** – collapsible navbar on small screens
- 📋 **Copyable HTML Output** – generates clean, standalone HTML5 + JS + inline CSS
- 💾 **Remembers active tab** – `localStorage` used to restore previous tab
- 📺 **About Page** – includes student name, number, and video walkthrough
- ♿ **Accessibility Compliant** – semantic HTML, keyboard-friendly, aria labels

---

## 🗂️ Pages

| Route                 | Description                            |
|----------------------|----------------------------------------|
| `/` or `/tabs`       | Main Tabs Generator                    |
| `/pre-lab-questions` | Placeholder for pre-lab activities     |
| `/escape-room`       | Placeholder (to be developed later)    |
| `/coding-races`      | Placeholder (to be developed later)    |
| `/about`             | About page with student info + video   |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm (or yarn/pnpm/bun)

### Run locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev// Trigger redeploy

## 🐳 Docker & Prisma Setup

### Build the Image
```bash
docker build -t moodle-html-generator .