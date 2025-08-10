/**
 * Sample Google Apps Script Web App to serve sheet rows as JSON
 * Deploy as Web App (Execute as: Me, Who has access: Anyone)
 *
 * Expects query param 'q' with QR code value. Adjust header indices to match your sheet.
 */
function doGet(e){
  var q = e.parameter.q || '';
  var ss = SpreadsheetApp.openById('YOUR_SHEET_ID'); // set your sheet id
  var sheet = ss.getSheetByName('Sheet1'); // set sheet name
  var rows = sheet.getDataRange().getValues();
  var headers = rows[0];
  var result = {found:false, record:null};
  for(var i=1;i<rows.length;i++){
    var row = rows[i];
    if(row[0] == q){
      result.found = true;
      result.record = {
        qr: row[0],
        name: row[1],
        role: row[2],
        affiliation: row[3],
        photo: row[4]
      };
      break;
    }
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
