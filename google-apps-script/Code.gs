/**
 * Inner Performance - Google Sheets Form Handler
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://sheets.google.com and create a NEW spreadsheet
 * 2. Name it something like "Inner Performance Form Submissions"
 * 3. Go to Extensions > Apps Script
 * 4. Delete any code in the editor and paste this ENTIRE file
 * 5. Click Save (disk icon)
 * 6. Click Deploy > New deployment
 * 7. Click the gear icon > Select "Web app"
 * 8. Description: "Form handler"
 * 9. Execute as: Me
 * 10. Who has access: Anyone
 * 11. Click Deploy
 * 12. Copy the Web App URL (looks like https://script.google.com/macros/s/xxxxx/exec)
 * 13. Paste that URL into js/form-handler.js where it says YOUR_GOOGLE_SCRIPT_URL_HERE
 */

function doPost(e) {
  try {
    // Get form data - Google Apps Script receives form-urlencoded in e.parameter
    const params = e.parameter;
    const formType = params.formType || 'Unknown';
    
    // Sanitize sheet name (Google Sheets doesn't allow: \ / ? * [ ])
    const sheetName = formType.replace(/[\\\/\?\*\[\]]/g, '_');
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      const formKeys = Object.keys(params)
        .filter(k => !['formType', 'timestamp', 'pageUrl'].includes(k))
        .sort();
      const headers = ['Timestamp', 'Form Type', 'Page URL'].concat(formKeys);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    
    // Build row - get existing headers and match data
    const lastCol = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    
    const row = [];
    for (let i = 0; i < headers.length; i++) {
      const key = headers[i];
      if (key === 'Timestamp') {
        row.push(new Date());
      } else if (key === 'Form Type') {
        row.push(formType);
      } else if (key === 'Page URL') {
        row.push(params.pageUrl || '');
      } else {
        row.push(params[key] || '');
      }
    }
    
    sheet.appendRow(row);
    
    // Return success - user will see this if they open the iframe
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Thank you! Your enquiry has been received.' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
