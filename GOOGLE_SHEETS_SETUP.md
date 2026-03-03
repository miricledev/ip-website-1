# Google Sheets Form Setup – What You Need to Do

All forms on your site (Homepage, About, Contact, Coaching, Group, Youth, Schools) are set up to submit to **one Google Sheet**, with a **separate tab for each form type**.

---

## Step 1: Create the Google Sheet

1. Go to **[sheets.google.com](https://sheets.google.com)**
2. Create a **new blank spreadsheet**
3. Name it (e.g. **"Inner Performance Form Submissions"**)

---

## Step 2: Add the Script

1. In the spreadsheet, go to **Extensions → Apps Script**
2. Delete any code in the editor
3. Open the file **`google-apps-script/Code.gs`** in this project
4. Copy **all** of its contents
5. Paste into the Apps Script editor
6. Click **Save** (disk icon) or press `Ctrl+S`

---

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to “Select type”
3. Choose **Web app**
4. Set:
   - **Description:** `Form handler` (or leave blank)
   - **Execute as:** `Me` (your Google account)
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. Approve permissions if asked (click your account → **Advanced** → **Go to…** → **Allow**)
7. Copy the **Web app URL** (it will look like:  
   `https://script.google.com/macros/s/AKfycbz.../exec`)

---

## Step 4: Add the URL to Your Site

1. Open **`js/form-handler.js`**
2. Find the line:  
   `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your copied URL (keep the quotes), e.g.:  
   `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';`
4. Save the file

---

## How It Works

- Each form type gets its **own tab** in the same spreadsheet:
  - Homepage Contact  
  - About Enquiry  
  - Detailed Contact  
  - Coaching Enquiry  
  - Group Session Enquiry  
  - Youth Program Enquiry  
  - Schools Demo  
  - Schools Partnership  

- Tabs are created automatically the first time each form type is submitted.
- Each row includes: **Timestamp**, **Form Type**, **Page URL**, and all form fields.

---

## Troubleshooting

**Forms don’t submit**

- Confirm the URL in `form-handler.js` is correct and ends with `/exec`
- Make sure the Apps Script deployment is set to **Anyone** can access

**Permission errors**

- When deploying, choose **Anyone** for “Who has access”
- Approve all requested permissions in the Google consent screen
