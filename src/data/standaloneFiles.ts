/**
 * Standalone static files for direct Netlify / zero-build hosting
 */

export const STANDALONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wedding Invitation — Mussadiq Hussain & D/o Saleem Satti</title>
  <meta name="description" content="Wedding invitation of Mussadiq Hussain and D/o Saleem Satti, hosted by Mr. & Mrs. Sadaqat Hussain in Islamabad.">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Floating Audio / Replay Accessibility Bar -->
  <aside class="action-dock" aria-label="Invitation controls">
    <button id="replayBtn" class="dock-btn" title="Replay Opening Invitation" aria-label="Replay invitation opening">
      <svg class="dock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
      <span>Replay Opening</span>
    </button>
  </aside>

  <!-- SECTION 1: CINEMATIC 3D OPENING CARD & HERO -->
  <header class="hero-stage" id="heroStage">
    
    <div class="ambient-flora flora-left" aria-hidden="true">
      <svg viewBox="0 0 200 300" class="svg-flora">
        <path d="M20,280 C60,200 30,120 110,60 C130,45 150,70 125,95 C95,125 140,165 95,220 C80,240 50,270 20,280 Z" fill="#A8B5A0" opacity="0.35"/>
        <path d="M125,95 C145,80 180,90 170,115 C155,145 120,135 125,95 Z" fill="#E9CFC8" opacity="0.45"/>
        <path d="M100,160 C125,145 150,170 135,190 C110,210 90,185 100,160 Z" fill="#E9CFC8" opacity="0.4"/>
      </svg>
    </div>
    <div class="ambient-flora flora-right" aria-hidden="true">
      <svg viewBox="0 0 200 300" class="svg-flora">
        <path d="M180,280 C140,200 170,120 90,60 C70,45 50,70 75,95 C105,125 60,165 105,220 C120,240 150,270 180,280 Z" fill="#A8B5A0" opacity="0.35"/>
        <path d="M75,95 C55,80 20,90 30,115 C45,145 80,135 75,95 Z" fill="#E9CFC8" opacity="0.45"/>
        <path d="M100,160 C75,145 50,170 65,190 C90,210 110,185 100,160 Z" fill="#E9CFC8" opacity="0.4"/>
      </svg>
    </div>

    <div class="invitation-3d-wrapper">
      <div class="invitation-envelope" id="invitationEnvelope">
        
        <!-- INNER CARD (REVEALED CONTENT) -->
        <div class="card-interior" id="cardInterior">
          <div class="interior-border-outer">
            <div class="interior-border-inner">

              <!-- Corner Ornamental Filigrees -->
              <div class="corner-filigree top-left" aria-hidden="true">
                <svg viewBox="0 0 60 60"><path d="M5,5 L5,40 C5,20 20,5 40,5 L5,5 Z M12,12 L12,28 C15,18 18,15 28,12 L12,12 Z" fill="#C9A66B"/></svg>
              </div>
              <div class="corner-filigree top-right" aria-hidden="true">
                <svg viewBox="0 0 60 60"><path d="M55,5 L55,40 C55,20 40,5 20,5 L55,5 Z M48,12 L48,28 C45,18 42,15 32,12 L48,12 Z" fill="#C9A66B"/></svg>
              </div>
              <div class="corner-filigree bottom-left" aria-hidden="true">
                <svg viewBox="0 0 60 60"><path d="M5,55 L5,20 C5,40 20,55 40,55 L5,55 Z M12,48 L12,32 C15,42 18,45 28,48 L12,48 Z" fill="#C9A66B"/></svg>
              </div>
              <div class="corner-filigree bottom-right" aria-hidden="true">
                <svg viewBox="0 0 60 60"><path d="M55,55 L55,20 C55,40 40,55 20,55 L55,55 Z M48,48 L48,32 C45,42 42,45 32,48 L48,48 Z" fill="#C9A66B"/></svg>
              </div>

              <!-- Top Emblem & Bismillah Calligraphic Motif -->
              <div class="interior-header">
                <div class="arch-crest" aria-hidden="true">
                  <svg viewBox="0 0 140 40" class="arch-crest-svg">
                    <path d="M10,35 Q70,-10 130,35" fill="none" stroke="#C9A66B" stroke-width="1.5"/>
                    <path d="M25,35 Q70,0 115,35" fill="none" stroke="#A98548" stroke-width="0.8"/>
                    <circle cx="70" cy="12" r="3.5" fill="#C9A66B"/>
                    <circle cx="58" cy="15" r="2" fill="#A98548"/>
                    <circle cx="82" cy="15" r="2" fill="#A98548"/>
                  </svg>
                </div>
                <p class="bismillah-phrase">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                <p class="bismillah-trans">In the name of Allah, the Most Gracious, the Most Merciful</p>
              </div>

              <!-- Hosts & Formal Invite -->
              <div class="interior-hosts">
                <h2 class="host-title">Mr. &amp; Mrs. Sadaqat Hussain</h2>
                <div class="gold-divider-gem" aria-hidden="true">
                  <span class="gold-line"></span>
                  <span class="gem-symbol">♦</span>
                  <span class="gold-line"></span>
                </div>
                <p class="invite-sentence">
                  Request the pleasure of your company at the wedding ceremony of their beloved Son
                </p>
              </div>

              <!-- Couple Presentation -->
              <div class="couple-spotlight">
                <h1 class="groom-name">Mussadiq Hussain</h1>
                <div class="connector-oval">
                  <span class="connector-text">with</span>
                </div>
                <h2 class="bride-name">D/o Saleem Satti</h2>
              </div>

              <!-- Invitation Footnote -->
              <div class="interior-footer-note">
                <p class="venue-brief">White Pearl Marquee • Islamabad</p>
                <p class="date-brief">20 – 22 November 2026</p>
              </div>

            </div>
          </div>
        </div>

        <!-- LEFT HINGED DOOR PANEL -->
        <div class="card-door door-left" id="doorLeft">
          <div class="door-inner-pattern">
            <div class="door-gold-frame">
              
              <div class="door-flora-art" aria-hidden="true">
                <svg viewBox="0 0 100 180" class="door-flora-svg">
                  <path d="M10,170 C40,110 20,60 85,15 C60,40 50,75 55,100" fill="none" stroke="#C9A66B" stroke-width="1.2" stroke-linecap="round"/>
                  <circle cx="85" cy="15" r="4" fill="#E9CFC8"/>
                  <circle cx="65" cy="45" r="3" fill="#C9A66B"/>
                  <circle cx="45" cy="85" r="3.5" fill="#E9CFC8"/>
                  <path d="M25,120 Q55,115 50,140" fill="none" stroke="#A8B5A0" stroke-width="1"/>
                </svg>
              </div>

              <div class="door-seal-half seal-left">
                <div class="seal-circle">
                  <span class="seal-letter">M</span>
                </div>
              </div>

              <div class="door-text-block">
                <span class="door-sub">Together With</span>
                <span class="door-main">Our Families</span>
              </div>

            </div>
          </div>
        </div>

        <!-- RIGHT HINGED DOOR PANEL -->
        <div class="card-door door-right" id="doorRight">
          <div class="door-inner-pattern">
            <div class="door-gold-frame">

              <div class="door-flora-art flip-h" aria-hidden="true">
                <svg viewBox="0 0 100 180" class="door-flora-svg">
                  <path d="M10,170 C40,110 20,60 85,15 C60,40 50,75 55,100" fill="none" stroke="#C9A66B" stroke-width="1.2" stroke-linecap="round"/>
                  <circle cx="85" cy="15" r="4" fill="#E9CFC8"/>
                  <circle cx="65" cy="45" r="3" fill="#C9A66B"/>
                  <circle cx="45" cy="85" r="3.5" fill="#E9CFC8"/>
                  <path d="M25,120 Q55,115 50,140" fill="none" stroke="#A8B5A0" stroke-width="1"/>
                </svg>
              </div>

              <div class="door-seal-half seal-right">
                <div class="seal-circle">
                  <span class="seal-letter">S</span>
                </div>
              </div>

              <div class="door-text-block">
                <span class="door-sub">Royal Union</span>
                <span class="door-main">Invitation</span>
              </div>

            </div>
          </div>
        </div>

        <!-- INTERACTIVE OPEN TRIGGER BUTTON -->
        <div class="card-lock-trigger" id="cardLockTrigger">
          <button id="openDoorBtn" class="open-card-btn" aria-label="Open the wedding invitation card">
            <span class="btn-emboss">
              <svg class="wax-seal-icon" viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="21" fill="none" stroke="#C9A66B" stroke-width="1.5" stroke-dasharray="3 2"/>
                <circle cx="24" cy="24" r="18" fill="#164C3B" stroke="#C9A66B" stroke-width="1.5"/>
                <path d="M16,24 L24,16 L32,24 L24,32 Z" fill="#C9A66B" opacity="0.9"/>
                <circle cx="24" cy="24" r="3" fill="#FFF9EF"/>
              </svg>
              <span class="btn-primary-text">OPEN THE INVITATION</span>
              <span class="btn-subtitle">Click to unseal</span>
            </span>
          </button>
        </div>

      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-cue" id="scrollCue" aria-hidden="true">
      <span class="cue-label">Explore Programme</span>
      <div class="cue-chevron">
        <svg viewBox="0 0 24 24" fill="none" stroke="#C9A66B" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </div>
  </header>

  <!-- SECTION 2: PROGRAMME -->
  <main>
    <section class="section-programme" id="programme">
      <div class="container">
        <div class="section-title-wrap">
          <span class="section-eyebrow">Auspicious Celebrations</span>
          <h2 class="section-heading">Wedding Programme</h2>
          <div class="gold-divider-gem" aria-hidden="true">
            <span class="gold-line"></span>
            <span class="gem-symbol">❦</span>
            <span class="gold-line"></span>
          </div>
          <p class="section-subtitle">We cordially invite you to share our heartfelt moments and blessings</p>
        </div>

        <div class="timeline-grid">
          <!-- Event 1: Mehndi -->
          <article class="event-card">
            <div class="event-card-inner">
              <span class="event-badge">Pre-Wedding Festivity</span>
              <h3 class="event-name">Mehndi</h3>
              <p class="event-date">Friday, 20 November 2026</p>
              <div class="event-divider" aria-hidden="true"></div>
              <div class="event-schedule">
                <div class="schedule-row">
                  <span class="activity-name">Rasm Hina</span>
                  <span class="activity-time">8:00 PM</span>
                </div>
              </div>
              <p class="event-timezone">Pakistan Standard Time (PKT)</p>
            </div>
          </article>

          <!-- Event 2: Barat -->
          <article class="event-card event-card-featured">
            <div class="event-card-inner">
              <span class="event-badge badge-gold">The Main Ceremony</span>
              <h3 class="event-name">Barat</h3>
              <p class="event-date">Saturday, 21 November 2026</p>
              <div class="event-divider" aria-hidden="true"></div>
              <div class="event-schedule">
                <div class="schedule-row">
                  <span class="activity-name">Sehra Bandi</span>
                  <span class="activity-time">5:00 PM</span>
                </div>
                <div class="schedule-row">
                  <span class="activity-name">Departure of Barat</span>
                  <span class="activity-time">7:00 PM</span>
                </div>
              </div>
              <p class="event-timezone">Pakistan Standard Time (PKT)</p>
            </div>
          </article>

          <!-- Event 3: Walima -->
          <article class="event-card">
            <div class="event-card-inner">
              <span class="event-badge">The Reception</span>
              <h3 class="event-name">Walima</h3>
              <p class="event-date">Sunday, 22 November 2026</p>
              <div class="event-divider" aria-hidden="true"></div>
              <div class="event-schedule">
                <div class="schedule-row">
                  <span class="activity-name">Dinner</span>
                  <span class="activity-time">8:00 PM – 9:30 PM</span>
                </div>
              </div>
              <p class="event-timezone">Pakistan Standard Time (PKT)</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 3: VENUE -->
    <section class="section-venue" id="venue">
      <div class="container venue-container">
        <div class="venue-content-box">
          <span class="venue-eyebrow">The Destination</span>
          <h2 class="venue-title">White Pearl Marquee</h2>
          <address class="venue-address">Company Road Banigala Islamabad</address>
          <p class="venue-note">Join us in the scenic serenity of Banigala for an unforgettable celebration under the chandeliers.</p>
          <div class="venue-cta-wrap">
            <a href="https://www.google.com/maps/search/?api=1&query=White+Pearl+Marquee+Company+Road+Banigala+Islamabad" target="_blank" rel="noopener noreferrer" class="btn-gold-outline">
              VIEW VENUE ON GOOGLE MAPS
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: RSVP -->
    <section class="section-rsvp" id="rsvp">
      <div class="container">
        <div class="rsvp-frame">
          <div class="section-title-wrap">
            <span class="section-eyebrow">Kind Compliments</span>
            <h2 class="section-heading">R.S.V.P</h2>
          </div>
          <div class="rsvp-grid">
            <div class="rsvp-card">
              <h3 class="rsvp-name">Muqaddas Hussain</h3>
              <a href="tel:03081513315" class="rsvp-tel-link">0308-1513315</a>
            </div>
            <div class="rsvp-card">
              <h3 class="rsvp-name">Sharafat Hussain</h3>
              <a href="tel:03445310410" class="rsvp-tel-link">0344-5310410</a>
            </div>
            <div class="rsvp-card">
              <h3 class="rsvp-name">Khadam Hussain</h3>
              <p class="rsvp-honorific">With Family</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: FAMILY GREETING -->
    <section class="section-greeting" id="familyGreeting">
      <div class="container greeting-container">
        <span class="greeting-eyebrow">Warmest Regards</span>
        <h2 class="greeting-heading">Looking Forward</h2>
        <div class="greeting-card">
          <p class="greeting-lead">With prayers and warm anticipation of your presence:</p>
          <p class="greeting-hosts">Mr. &amp; Mrs.<br><span class="hosts-highlight">Sadaqat Hussain</span></p>
        </div>
        <div class="duas-box">
          <p class="dua-arabic">بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p>
          <p class="dua-english">“May Allah bless you, shower His blessings upon you, and unite you both in goodness.”</p>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-container">
      <p class="footer-couple">Mussadiq &amp; Saleem Satti’s Daughter</p>
      <p class="footer-copy">White Pearl Marquee, Islamabad • November 2026</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;
