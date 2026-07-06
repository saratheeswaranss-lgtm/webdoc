from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "webdoc-dev-secret-change-this-in-production"

# ---------------------------------------------------------------------------
# Site-wide data. Keeping this here (instead of hardcoding into templates)
# makes it a one-spot edit if you add a service or client later.
# ---------------------------------------------------------------------------

SERVICES = [
    {
        "id": "web",
        "tag": "WEBSITE BUILDING",
        "title": "Websites that load fast and look expensive",
        "summary": "Custom-built, responsive websites designed around your brand, not a template.",
        "detail": "From single-page landing sites to multi-page business sites — built with clean code, "
                   "fast load times, and a design that matches the quality of what you're selling. "
                   "Includes mobile optimization, on-page SEO basics, and a short handover walkthrough.",
        "points": ["Responsive on every device", "SEO-ready structure", "Fast hosting setup guidance"],
    },
    {
        "id": "ecommerce",
        "tag": "E-COMMERCE STORE",
        "title": "Online stores built to convert browsers into buyers",
        "summary": "Full e-commerce builds with product catalogues, cart, and secure checkout.",
        "detail": "A store that's easy for you to manage and easy for customers to buy from — product pages, "
                   "cart and checkout flow, payment gateway integration, and inventory basics, all wrapped "
                   "in a clean, trustworthy design.",
        "points": ["Secure payment integration", "Easy product management", "Mobile-first checkout"],
    },
    {
        "id": "meta-ads",
        "tag": "META ADS",
        "title": "Facebook & Instagram campaigns that target the right people",
        "summary": "Ad campaigns built around your actual customers, not guesswork.",
        "detail": "Audience research, creative direction, campaign setup, and ongoing optimization across "
                   "Facebook and Instagram — focused on cost-per-result, not just impressions.",
        "points": ["Audience targeting & research", "Creative & copy support", "Weekly performance tuning"],
    },
    {
        "id": "google-ads",
        "tag": "GOOGLE ADS",
        "title": "Search campaigns that show up when it matters",
        "summary": "Search and display campaigns tuned for qualified traffic and lower cost-per-click.",
        "detail": "Keyword research, ad copywriting, landing page alignment, and conversion tracking so you "
                   "know exactly what your ad spend is doing for you.",
        "points": ["Keyword & competitor research", "Conversion tracking setup", "Monthly reporting"],
    },
]

CLIENTS = [
    {
        "id": "vvit",
        "name": "VVIT Solutions",
        "side": "left",
        "category": "Corporate / Institutional",
        "description": "A complete website rebuild focused on credibility and clarity — built to make a "
                        "technical institution's offerings easy to understand at a glance.",
        "tags": ["Website Build", "SEO Structure", "Content Layout"],
    },
    {
        "id": "c2c",
        "name": "C2C",
        "side": "right",
        "category": "Business / Services",
        "description": "A modern, conversion-focused site paired with ad campaign support — designed to turn "
                        "visitors arriving from paid traffic into actual enquiries.",
        "tags": ["Website Build", "Meta Ads", "Google Ads"],
    },
]

CONTACT_INFO = {
    "phone": "+91 00000 00000",
    "phone_display": "+91 00000 00000",
    "email": "hello@webdoc.com",
    "instagram_handle": "@webdoc",
    "instagram_url": "https://instagram.com/webdoc",
}


@app.context_processor
def inject_globals():
    """Makes contact info available in every template without passing it explicitly."""
    return {"contact": CONTACT_INFO}


@app.route("/")
def home():
    return render_template("index.html", active="home")


@app.route("/services")
def services():
    return render_template("services.html", active="services", services=SERVICES)


@app.route("/clients")
def clients():
    return render_template("clients.html", active="clients", clients=CLIENTS)


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()

        if not name or not email or not message:
            flash("Please fill in every field before sending.", "error")
        else:
            # Hook up an email service (e.g. Flask-Mail, SendGrid) here later.
            # For now this just confirms receipt back to the visitor.
            print(f"[New enquiry] {name} <{email}>: {message}")
            flash("Message received. We'll get back to you soon.", "success")
        return redirect(url_for("contact"))

    return render_template("contact.html", active="contact")


if __name__ == "__main__":
    app.run(debug=True)
