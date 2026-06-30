/* ==========================================
   Google Apps Script → Google Sheets
   ==========================================
   SETUP:
   1. sheets.google.com → New Sheet
   2. Extensions → Apps Script
   3. Is code ko paste karo
   4. Deploy → New Deployment → Web App
      - Execute as: "Me", Access: "Anyone"
   5. Deploy → URL copy karo
   6. Ye URL "script.js" me "YOUR_WEB_APP_URL_HERE" ki jagah lagao

   ⚠️ Code change karne ke baad hamesha
      Deploy → Manage Deployments → New Version → Deploy
      karna hoga!
   ========================================== */

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Registrations");
    if (!sheet) {
      sheet = ss.insertSheet("Registrations");
      sheet.getRange(1, 1, 1, 5)
        .setValues([["Timestamp", "Name", "Phone", "Age", "Health Issues"]]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const timestamp = new Date();
    const name = e.parameter.name || "";
    const phone = e.parameter.phone || "";
    const age = e.parameter.age || "";
    const issues = e.parameter.issues || "";

    sheet.appendRow([timestamp, name, phone, age, issues]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "✅ Fat To Fit API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
