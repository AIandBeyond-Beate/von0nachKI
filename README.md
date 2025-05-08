# Von 0 nach KI - Vorbereitungsformular

Ein modernes, responsives Webformular zur Erfassung von Informationen für das "Von 0 nach KI" Programm.

## Features

- Modernes, responsives Design
- Benutzerfreundliche Formularfelder
- E-Mail-Versand über EmailJS
- Validierung der Pflichtfelder
- Erfolgsmeldung nach erfolgreicher Übermittlung

## Setup

1. Erstelle einen Account bei [EmailJS](https://www.emailjs.com/) (kostenloser Plan verfügbar)

2. Erstelle einen Email Service in EmailJS:
   - Gehe zu "Email Services" und füge einen neuen Service hinzu
   - Wähle deinen E-Mail-Provider (z.B. Gmail)
   - Folge den Anweisungen zur Einrichtung

3. Erstelle eine Email Template in EmailJS:
   - Gehe zu "Email Templates"
   - Erstelle ein neues Template
   - Verwende die Variablen `{{from_name}}`, `{{to_name}}` und `{{message}}`

4. Aktualisiere die Konfiguration in `script.js`:
   - Ersetze `YOUR_PUBLIC_KEY` mit deinem EmailJS Public Key
   - Ersetze `YOUR_SERVICE_ID` mit deiner Service ID
   - Ersetze `YOUR_TEMPLATE_ID` mit deiner Template ID

5. Füge das EmailJS SDK zu deiner HTML-Datei hinzu:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

## Verwendung

1. Lade die Dateien auf deinen Webserver hoch
2. Stelle sicher, dass alle Dateien im gleichen Verzeichnis liegen
3. Öffne die `index.html` in einem Browser

## Dateien

- `index.html` - Die Hauptseite mit dem Formular
- `styles.css` - Styling für das Formular
- `script.js` - JavaScript für Formularverarbeitung und E-Mail-Versand

## Anpassung

- Farben können in der `styles.css` Datei unter den `:root` Variablen angepasst werden
- Formularfelder können in der `index.html` Datei hinzugefügt oder entfernt werden
- Die E-Mail-Formatierung kann in der `formatEmailContent` Funktion in `script.js` angepasst werden 