# Student Portfolio & Academic Management Website

Term project for COS 106 — Introduction to Web Technologies.

## Pages
- `index.html` — Homepage (name, photo, welcome message, nav, bio)
- `about.html` — Education, career goals, skills table, hobbies
- `projects.html` — Three sample projects + a multimedia demo clip
- `planner.html` — Interactive academic task planner (add / complete / delete)
- `contact.html` — Contact form with JS validation

## Before you submit
1. Replace the placeholder name ("Ada Obi"), bio, school and email throughout
   every HTML file with your own details.
2. Swap the SVG placeholder avatar in `index.html` for a real `<img>` of your photo.
3. Replace the `.project-thumb` placeholder blocks in `projects.html` with real
   screenshots (`<img src="...">`), and update the project descriptions/links.
4. Replace the placeholder video `src` in `projects.html` with your own clip,
   or remove the section if not needed.
5. Update the GitHub links in `projects.html` to point at your real repos.

## Run locally
No build step needed — open `index.html` directly in a browser, or serve the
folder with any static server (e.g. the VS Code "Live Server" extension).

## Deploy (GitHub Pages)
1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Set the source branch to `main` (or `master`) and folder to `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Tech used
Semantic HTML5, external CSS (Flexbox + Grid, responsive, transitions), and
vanilla JavaScript (DOM manipulation, event handling, form validation,
localStorage-backed task management).
