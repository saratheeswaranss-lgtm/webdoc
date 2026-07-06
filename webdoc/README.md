# WebDoc — Flask Website

A four-page agency website for WebDoc (website building, e-commerce stores, Meta Ads, Google Ads),
built with Flask + Jinja templates, vanilla CSS/JS, black-and-white premium design with ambient
glow animation, a pill-shaped nav with popup menus, and animated service/client cards.

## Project structure

```
webdoc/
├── app.py                  # Flask app + routes
├── requirements.txt
├── templates/
│   ├── base.html            # shared layout: header, pill nav, footer
│   ├── index.html           # Home: hero + about
│   ├── services.html        # Services grid with popup detail cards
│   ├── clients.html         # Client showcase (VVIT Solutions / C2C)
│   └── contact.html         # Contact info + form
└── static/
    ├── css/style.css        # all styling + animations
    ├── js/script.js         # popups, scroll reveal, tilt, mobile menu
    └── images/               # put real client screenshots here
```

## Running it in VS Code

1. Open this folder in VS Code.
2. Open a terminal (`` Ctrl+` ``) and create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate it:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the app:
   ```bash
   python app.py
   ```
6. Open **http://127.0.0.1:5000** in your browser.

Flask's debug mode is on, so the page auto-reloads whenever you save a file.

## Things you'll want to customize

- **Contact info**: edit the `CONTACT_INFO` dict at the top of `app.py` (phone, email, Instagram).
- **Services copy**: edit the `SERVICES` list in `app.py`.
- **Client details**: edit the `CLIENTS` list in `app.py`. The client cards currently show a
  CSS-drawn browser mockup instead of real screenshots — drop real screenshots into
  `static/images/` and swap the `.mock-browser` block in `templates/clients.html` for an
  `<img>` tag once you have them.
- **Contact form**: right now submitting the form just prints the enquiry to your terminal and
  shows a "message received" confirmation. To actually receive emails, wire up something like
  `Flask-Mail` or a service like SendGrid inside the `contact()` view in `app.py`.
- **Fonts/colors**: all design tokens (colors, fonts, spacing) are CSS variables at the top of
  `static/css/style.css` under `:root` — change them there and they cascade everywhere.

## Notes on the animations

- Ambient glow blobs drift slowly behind the hero (pure CSS keyframes).
- The nav's "Services" and "Contact Us" items pop open a small info panel on hover (desktop) or
  tap (touch devices).
- Service cards flip open in place when clicked/tapped to reveal full details.
- Client cards use a subtle mouse-tracked tilt on desktop.
- Everything respects `prefers-reduced-motion` — animations are disabled automatically for users
  who have that OS setting turned on.
