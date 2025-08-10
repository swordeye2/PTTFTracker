PTTF Umpire Tracker - Starter Package
------------------------------------
Files included:
 - index.html       : main page (loads Pontano Sans from Google Fonts)
 - style.css        : layout + overlay styles
 - script.js        : QR scanning + data lookup logic (set SHEETS_API_URL)
 - data.json        : local sample data fallback for testing
 - apps_script_sample.gs : sample Google Apps Script to publish sheet as JSON
 - assets/          : placeholder template and sample photos (replace with real files)

Instructions:
  1. Replace assets/id-template.png and sample images in assets/.
  2. If using Google Sheets: copy apps_script_sample.gs into Apps Script, set YOUR_SHEET_ID, deploy as Web App.
     Then edit script.js and set SHEETS_API_URL to your web app URL.
  3. Upload to GitHub repo and enable Pages (or use the Actions static workflow).
  4. Test by scanning QR codes whose values match the "QR_Code" keys (e.g., 12345).
