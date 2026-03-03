# 🛒 Shop Flow App

Shop Flow App is a **scalable, modular and production-like web application** built with **Angular 21**.  
It allows users to browse, manage and purchase products while demonstrating **modern Angular best practices**, **advanced TypeScript patterns** and **clean architecture principles**.

The project is fully dynamic, continuously evolving and designed for maintainability, testability and long-term scalability.

---

## ✨ Features

- **User Authentication:** Register, Login, Forgot Password, Email OTP verification
- **Secure Routing:** Route guards and second router outlet for nested layouts
- **State Management:** NgRx and Signal Store with advanced Angular Signals (`signal`, `computed`, `linkedSignal`, `untracked`, `resource`)
- **Checkout & Payments:** Stripe integration with backend Node.js API
- **Add Product & File Upload:** Users can add products with dynamic forms and upload images/files
- **Cart & Orders Module:** Full shopping flow with cart management, order tracking and checkout
- **Product Module:** Filtering, sorting, select filtering, pagination, dynamic tables and product search
- **Dynamic Reactive Forms:** Custom controls, centralized validation schemas and dynamic error messages
- **Local & Session Storage:** Cart, user session and temporary form data persisted for better UX
- **Responsive UI:** Fully responsive layouts with Tailwind CSS
- **Lazy Loading & Modular Architecture:** Feature-based lazy-loaded modules for scalability
- **Advanced TypeScript:** Union types, generics, mapped types and type-safe patterns

---

## 🛠️ Technologies

- **Framework:** Angular 21
- **Languages:** TypeScript, JavaScript (ES6+)
- **State Management:** NgRx, Signal Store, RxJS
- **Unit Testing:** Jasmine to Jest
- **Styling:** Tailwind CSS
- **Backend:** Node.js REST API (Stripe Checkout)
- **Architecture:** Modular, lazy-loaded, clean architecture

---

## 🧱 Architecture

- Modular, feature-based, lazy-loaded structure
- Clear separation of responsibilities:
  - Presentation components
  - Business logic services
  - State management via NgRx and Signal Store
  - Routing with guards and nested outlets
- **Form & File Handling:** Dynamic reactive forms with reusable custom controls and validation schemas; file uploads handled with type-safe Angular services
- **State Persistence:** Cart, user session and temporary form data persisted in `localStorage` and `sessionStorage`
- **Add Product Flow:** Uses reactive signals and centralized services to ensure type-safety, form validation and smooth integration with product and cart modules
- Advanced reactive patterns using Angular Signals and computed/linked/untracked signals
- Centralized, reusable form schemas for maintainability and type safety
