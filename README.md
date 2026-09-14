📝 Notes App

A modern, clean, and responsive Notes Application built with React.js,
Redux Toolkit, Tailwind CSS, localStorage, and React Markdown.

The application allows users to create, edit, delete, organize, and
filter notes using multiple tags. All application data is managed
through Redux Toolkit and persisted in the browser using localStorage.

live demo :https://notes-app-three-puce.vercel.app/

🚀 Features

Create notes

Edit existing notes

Delete notes with confirmation

View all notes

Add multiple tags to a note

Create custom tags

Prevent duplicate tags

Remove tags from notes

Filter notes by one or multiple tags

Multi-tag filtering uses AND logic

Clear active filters

Markdown support for note bodies

Markdown rendering using react-markdown

localStorage persistence

Responsive and mobile-friendly UI

Clean and accessible interface

No backend or database required

🛠️ Tech Stack

Frontend

React.js

Vite

JavaScript ES6+

Tailwind CSS

React Icons

React Markdown

State Management

Redux Toolkit

React Redux

Persistence

Browser localStorage

📁 Project Structure

notes-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── NoteCard.jsx
│   │   ├── NoteForm.jsx
│   │   ├── TagFilter.jsx
│   │   ├── TagList.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── pages/
│   │   └── Notes.jsx
│   │
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       └── notesSlice.js
│   │
│   ├── utils/
│   │   └── localStorage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md

⚙️ Installation

1. Clone or download the project

git clone <your-repository-url>
cd notes-app

If you downloaded the ZIP, extract it and open the project folder in VS
Code.

2. Install dependencies

npm install

3. Start the development server

npm run dev

Open the local URL shown by Vite in your browser.

📦 Required Packages

The application uses:

npm install @reduxjs/toolkit react-redux react-markdown react-icons
npm install -D tailwindcss@3 postcss autoprefixer

🧠 Redux State

Redux stores the main application data:

{
  notes: [],
  tags: ["Work", "Personal", "Urgent"],
  selectedTags: []
}

Each note follows this structure:

{
  id: "unique-id",
  title: "Complete MERN Project",
  body: "## Today's Tasks\n\n- Complete Redux",
  tags: ["Work", "Urgent"],
  createdAt: "date",
  updatedAt: "date"
}

🔄 Redux Actions

The notes slice provides:

addNote

updateNote

deleteNote

addTag

deleteTag

setSelectedTags

clearFilters

React local state is only used for temporary UI data such as form
fields, modal state, and the temporary custom-tag input.

🏷️ Tag System

Default tags:

Work

Personal

Urgent

Users can create custom tags such as:

Ideas

Study

Projects

Important

Duplicate tags are prevented using a case-insensitive comparison.

For example, if Work already exists, creating work will not create
another tag.

🔎 Multi-Tag Filtering

The application supports filtering by multiple tags.

For example:

Selected:
Work + Urgent

Given:

Note A → Work, Urgent
Note B → Work
Note C → Personal, Urgent

The result will be:

Note A

This is implemented using every() so that a note must contain all
selected tags.

💾 localStorage Persistence

Redux is the source of truth for application state.

localStorage is used only for persistence.

The stored data uses the key:

notes-app-data

When the application starts:

localStorage
     ↓
loadNotesState()
     ↓
Redux initial state
     ↓
React UI

When notes or tags change:

Redux state changes
        ↓
store.subscribe()
        ↓
saveNotesState()
        ↓
localStorage

The selected filters are intentionally not persisted because they
represent temporary UI state.

📝 Markdown Support

The note editor uses a normal textarea.

Users can write basic Markdown:

# Heading

## Subheading

This is **bold text**.

This is *italic text*.

- Task one
- Task two

Use `inline code`.

When a note is displayed, the Markdown is rendered using:

<ReactMarkdown>{note.body}</ReactMarkdown>

✏️ Create and Edit Notes

Create

Click Add Note

Enter a title

Write the note body

Select existing tags

Optionally create a custom tag

Click Save Note

Edit

Click the edit icon on a note

Existing title, body, and tags are loaded

Make changes

Click Save Changes

The existing note ID is preserved, so editing does not create a
duplicate note.

🗑️ Delete Notes

Click the delete icon on any note.

A confirmation dialog appears:

Are you sure you want to delete this note?

If confirmed, the note is removed from Redux and localStorage is updated
automatically.

📱 Responsive Design

The UI is designed for:

Desktop

Laptop

Tablet

Mobile

Notes use a responsive grid:

Mobile   → 1 column
Tablet   → 2 columns
Desktop  → 3 columns

🧩 Architecture

The project follows a simple separation of responsibilities:

Components
    ↓
Redux Actions
    ↓
Redux Store
    ↓
localStorage

Components

Responsible for UI and user interaction.

Redux Slice

Responsible for application data and state changes.

localStorage Utility

Responsible for saving and loading persisted data.

Notes Page

Responsible for combining the UI components and applying note filtering.

🔐 Backend

There is no backend.

There is also:

No API

No MongoDB

No Express.js

No authentication

No external database

All notes are stored locally in the user's browser.

🏗️ Production Build

Create a production build:

npm run build

Preview the production build:

npm run preview

🌐 Deployment

The project can be deployed to frontend hosting platforms such as:

Vercel

Netlify

GitHub Pages

Cloudflare Pages

Because the application has no backend, only the frontend build needs to
be deployed.

📌 Future Improvements

Possible future enhancements include:

Search notes by title/content

Pin important notes

Sort notes by date

Dark mode

Drag-and-drop note organization

Markdown preview while editing

Export/import notes as JSON

Note archiving

Keyboard shortcuts

Pagination or virtualization for very large note collections

👩‍💻 Author

Priya Tomar

MERN Stack Developer

📄 License

This project is created for learning, practice, and portfolio purposes.
