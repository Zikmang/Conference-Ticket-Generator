# Conference Ticket Generator


## About
The **Conference Ticket Generator** is a modern, component-based web application that generates personalized conference tickets.

Originally a static form, this project has been re-engineered into a robust React application. It focuses on delivering a high-end user experience through micro-interactions, seamless page transitions, and strict data validation. It demonstrates a separation of concerns by isolating business logic from UI components.

###  Key Features
**User Experience (UX) & Animation**
- **3D Holographic Ticket:** A custom mouse-tracking effect that tilts the ticket in 3D space using Framer Motion.

- **Micro-Interactions:** Inputs vibrate ("shake") intuitively upon validation errors, providing immediate visual feedback.

- **Smooth Transitions:** utilizing AnimatePresence for fluid entry and exit animations between the form and the generated ticket.

**Robust Validation**
- **Schema-Based Validation:** Implements Zod to enforce strict typing and format rules for names, emails, and GitHub usernames.

- **Real-time Feedback:** Conditional UI rendering instantly alerts users to format errors or missing fields.

**File Handling**
- **Drag & Drop Upload:** A fully interactive drop zone for avatar uploads.

- **Image Preview:** Instant client-side generation of image previews before submission.


## Technical Architecture

1.  **Custom Hooks (`useFormLogic`):**
    * All form state, handlers, and side effects are abstracted into a custom hook.
    * This keeps the UI components pure, readable, and makes the logic easily testable.

2.  **Component Composition:**
    * Modular architecture (`Form.jsx`, `SuccessCard.jsx`, `Header.jsx`) ensures code reusability and maintainability.

3.  **Declarative Animations:**
    * Animations are state-driven using `framer-motion` variants, avoiding messy imperative DOM manipulation.
