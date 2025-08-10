// Replace this URL with your published Google Apps Script Web App URL that returns JSON.
const SHEETS_API_URL = "YOUR_GOOGLE_SHEETS_WEBAPP_URL"; // <-- set this before deploying

const readerElementId = "reader";
const idCard = document.getElementById('id-card');
const idName = document.getElementById('id-name');
const idRole = document.getElementById('id-role');
const idAffil = document.getElementById('id-affil');
const idPhoto = document.getElementById('id-photo');

function showRecord(rec){
  idName.textContent = rec.name || '';
  idRole.textContent = rec.role || '';
  idAffil.textContent = rec.affiliation || '';
  if(rec.photo && rec.photo.length) idPhoto.src = rec.photo;
  idCard.classList.remove('hidden');
}

function onScanSuccess(decodedText, decodedResult){
  // decodedText is the scanned QR code string
  // try fetch from Google Sheets WebApp
  if(!SHEETS_API_URL || SHEETS_API_URL.includes('YOUR_GOOGLE_SHEETS')){
    // fallback to local sample data.json (for testing when not configured)
    fetch('data.json').then(r=>r.json()).then(data=>{
      if(data[decodedText]) showRecord(data[decodedText]);
      else alert('No record found for: ' + decodedText);
    }).catch(err=>{ console.error(err); alert('Error reading local data.json')});
    return;
  }

  fetch(SHEETS_API_URL + '?q=' + encodeURIComponent(decodedText))
    .then(r=>r.json())
    .then(json=>{
      if(json && json.found) showRecord(json.record);
      else alert('No record found for: ' + decodedText);
    })
    .catch(err=>{
      console.error('Fetch error', err);
      alert('Error fetching data. Check SHEETS_API_URL in script.js');
    });
}

function onScanFailure(error){
  // silently ignore or log
  // console.warn(`QR scan error: ${error}`);
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  readerElementId, { fps: 10, qrbox: 250 }, /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
