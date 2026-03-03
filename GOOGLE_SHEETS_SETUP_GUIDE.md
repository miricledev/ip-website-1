# Google Sheets Integration Setup Guide

This guide will walk you through setting up all website forms to automatically save data to a Google Spreadsheet.

## 📋 Overview

All 8 forms on your website will write to a single Google Spreadsheet with separate sheets for each form type:
1. Homepage Contact Form
2. About Page Enquiry Form
3. Detailed Contact Form (Contact Page)
4. Coaching Enquiry Form
5. Group Session Enquiry Form
6. Youth Program Enquiry Form
7. Schools Demo Form
8. Schools Partnership Form

---

## 🚀 Step-by-Step Setup

### **STEP 1: Create Your Google Spreadsheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"Inner Performance - Website Form Submissions"**
4. Create the following sheets (tabs) by clicking the **+** button at the bottom:
   - `Homepage Contact`
   - `About Enquiry`
   - `Detailed Contact`
   - `Coaching Enquiry`
   - `Group Session`
   - `Youth Program`
   - `Schools Demo`
   - `Schools Partnership`

5. For each sheet, add column headers in **Row 1**:

#### Homepage Contact Sheet:
```
Timestamp | Name | Email | Phone | Service | Message | Page URL
```

#### About Enquiry Sheet:
```
Timestamp | Name | Email | Service | Message | Page URL
```

#### Detailed Contact Sheet:
```
Timestamp | First Name | Last Name | Email | Phone | Organization | Service Interest | Experience | Goals | Timeline | Budget | Additional Info | Newsletter | Privacy | Page URL
```

#### Coaching Enquiry Sheet:
```
Timestamp | Name | Email | Phone | Service | Goals | Page URL
```

#### Group Session Sheet:
```
Timestamp | Name | Organization | Email | Phone | Session Type | Group Size | Message | Page URL
```

#### Youth Program Sheet:
```
Timestamp | Parent/Guardian Name | Child Name | Child Age | Email | Phone | Program Interest | Goals | Page URL
```

#### Schools Demo Sheet:
```
Timestamp | School Name | Contact Name | Position | Email | Phone | School Size | School Type | Current Challenges | Goals | Page URL
```

#### Schools Partnership Sheet:
```
Timestamp | Contact Name | School/Organization | Email | Phone | Program Interest | Message | Page URL
```

---

### **STEP 2: Set Up Google Apps Script**

1. In your Google Spreadsheet, click **Extensions** → **Apps Script**

2. Delete any code in the editor and paste the following code:

```javascript
/**
 * Inner Performance Website Form Handler
 * Receives form submissions and writes to appropriate sheet
 */

// Configuration - Map form types to sheet names
const FORM_SHEETS = {
  'Homepage Contact': 'Homepage Contact',
  'About Enquiry': 'About Enquiry',
  'Detailed Contact': 'Detailed Contact',
  'Coaching Enquiry': 'Coaching Enquiry',
  'Group Session Enquiry': 'Group Session',
  'Youth Program Enquiry': 'Youth Program',
  'Schools Demo': 'Schools Demo',
  'Schools Partnership': 'Schools Partnership'
};

// Define column mappings for each form type
const COLUMN_MAPPINGS = {
  'Homepage Contact': ['timestamp', 'name', 'email', 'phone', 'service', 'message', 'pageUrl'],
  
  'About Enquiry': ['timestamp', 'name', 'email', 'service', 'message', 'pageUrl'],
  
  'Detailed Contact': ['timestamp', 'firstName', 'lastName', 'email', 'phone', 'organization', 
                       'serviceInterest', 'experience', 'goals', 'timeline', 'budget', 
                       'additionalInfo', 'newsletter', 'privacy', 'pageUrl'],
  
  'Coaching Enquiry': ['timestamp', 'name', 'email', 'phone', 'service', 'goals', 'pageUrl'],
  
  'Group Session Enquiry': ['timestamp', 'name', 'organization', 'email', 'phone', 
                            'session-type', 'group-size', 'message', 'pageUrl'],
  
  'Youth Program Enquiry': ['timestamp', 'parent-name', 'child-name', 'child-age', 'email', 
                            'phone', 'program-interest', 'goals', 'pageUrl'],
  
  'Schools Demo': ['timestamp', 'school-name', 'contact-name', 'position', 'email', 'phone', 
                   'school-size', 'school-type', 'current-challenges', 'goals', 'pageUrl'],
  
  'Schools Partnership': ['timestamp', 'name', 'school', 'email', 'phone', 'service', 'message', 'pageUrl']
};

/**
 * Handle POST requests from website forms
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    
    // Get the spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get the appropriate sheet
    const sheetName = FORM_SHEETS[formType];
    if (!sheetName) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Unknown form type: ' + formType
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Sheet not found: ' + sheetName
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get column mapping for this form type
    const columns = COLUMN_MAPPINGS[formType];
    
    // Build row data in correct order
    const rowData = columns.map(column => {
      return data[column] || '';
    });
    
    // Append the new row
    sheet.appendRow(rowData);
    
    // Optional: Send email notification
    sendEmailNotification(formType, data);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'success',
    'message': 'Inner Performance Form Handler is running!'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Send email notification when form is submitted
 * OPTIONAL: Uncomment and configure if you want email alerts
 */
function sendEmailNotification(formType, data) {
  try {
    // Configure your email address here
    const EMAIL_ADDRESS = 'innerpk@tutanota.com';
    
    // Build email subject and body
    const subject = `New ${formType} Submission - Inner Performance`;
    
    let body = `New form submission received:\n\n`;
    body += `Form Type: ${formType}\n`;
    body += `Timestamp: ${data.timestamp}\n\n`;
    body += `Details:\n`;
    
    for (let key in data) {
      if (key !== 'formType' && key !== 'timestamp') {
        body += `${key}: ${data[key]}\n`;
      }
    }
    
    // Send email (uncomment to enable)
    // MailApp.sendEmail(EMAIL_ADDRESS, subject, body);
    
  } catch (error) {
    Logger.log('Email notification error: ' + error.toString());
  }
}
```

3. Click **Save** (💾 icon) and name your project: **"Inner Performance Form Handler"**

---

### **STEP 3: Deploy the Web App**

1. Click **Deploy** → **New deployment**

2. Click the **gear icon** ⚙️ next to "Select type"

3. Select **Web app**

4. Configure the deployment:
   - **Description**: `Form submission handler v1`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` ⚠️ IMPORTANT

5. Click **Deploy**

6. **Authorize the app**:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to Inner Performance Form Handler (unsafe)**
   - Click **Allow**

7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXX/exec
   ```
   
   ⚠️ **SAVE THIS URL** - you'll need it in Step 4!

---

### **STEP 4: Update Your Website Code**

1. Open `js/form-handler.js` file

2. Find this line at the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```

3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with the Web App URL you copied in Step 3:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXX/exec';
   ```

4. **Save the file**

---

### **STEP 5: Add Script to All HTML Pages**

Add the form handler script to each page with a form. Add this line **before** the closing `</body>` tag in each file:

#### Files to update:
- `index.html`
- `about.html`
- `contact.html`
- `coaching.html`
- `group.html`
- `youth.html`
- `schools.html`

**Add this line:**
```html
<script src="js/form-handler.js"></script>
```

**It should be placed right after:**
```html
<script src="js/main.js"></script>
<script src="js/form-handler.js"></script>  <!-- ADD THIS LINE -->
</body>
```

---

### **STEP 6: Test the Integration**

1. Upload all updated files to your web server

2. Visit each page with a form:
   - Homepage (index.html)
   - About page (about.html)
   - Contact page (contact.html)
   - Coaching page (coaching.html)
   - Group Sessions page (group.html)
   - Youth Development page (youth.html)
   - Schools page (schools.html) - Has 2 forms!

3. Fill out and submit each form

4. Check your Google Spreadsheet - you should see new rows appearing in the corresponding sheets!

---

## 🔧 Optional Enhancements

### Enable Email Notifications

To receive an email every time a form is submitted:

1. Open your Google Apps Script editor
2. Find the `sendEmailNotification` function
3. Uncomment this line (remove the `//`):
   ```javascript
   // MailApp.sendEmail(EMAIL_ADDRESS, subject, body);
   ```
   to:
   ```javascript
   MailApp.sendEmail(EMAIL_ADDRESS, subject, body);
   ```
4. Change `EMAIL_ADDRESS` to your email if needed
5. Save and deploy a new version

### Add Data Validation

In your Google Sheet, you can:
- Format the Timestamp column as Date & Time
- Add conditional formatting to highlight new submissions
- Create filters to sort by form type or date
- Set up data validation for specific columns

### Create a Dashboard

Use Google Sheets features to:
- Create pivot tables for analytics
- Add charts to visualize submission trends
- Use formulas to count submissions per day/week/month

---

## 🐛 Troubleshooting

### Forms not submitting?

1. **Check the Web App URL** in `js/form-handler.js`
2. **Verify sheet names** match exactly (case-sensitive)
3. **Check browser console** for error messages (F12 → Console tab)
4. **Ensure deployment** is set to "Anyone" access

### Data not appearing in sheets?

1. Check the Apps Script **Execution log**: Extensions → Apps Script → Executions
2. Verify column headers match the expected format
3. Make sure sheet names match the FORM_SHEETS configuration

### Email notifications not working?

1. Uncomment the `MailApp.sendEmail` line
2. Redeploy the web app
3. Check Gmail spam folder
4. Verify email address in script

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for JavaScript errors
2. Review the Apps Script execution logs
3. Verify all URLs and sheet names are correct
4. Test with a simple form first

---

## ✅ Success Checklist

- [ ] Google Spreadsheet created with all sheets
- [ ] Column headers added to each sheet
- [ ] Apps Script code pasted and saved
- [ ] Web App deployed with "Anyone" access
- [ ] Web App URL copied
- [ ] `form-handler.js` updated with Web App URL
- [ ] Script tag added to all HTML pages
- [ ] Files uploaded to web server
- [ ] Each form tested and verified
- [ ] Data appearing in correct sheets

---

**🎉 Congratulations! Your forms are now connected to Google Sheets!**

All form submissions will automatically be recorded in your spreadsheet with timestamps, and you can easily export to Excel, create reports, or integrate with other tools.

