# 🚀 Quick Start Checklist - Google Sheets Integration

Use this checklist to set up your forms to write to Google Sheets in 30 minutes!

---

## ✅ Step 1: Create Google Spreadsheet (5 minutes)

- [ ] Go to [Google Sheets](https://sheets.google.com)
- [ ] Create new spreadsheet: "Inner Performance - Website Form Submissions"
- [ ] Create 8 sheets (tabs):
  - [ ] Homepage Contact
  - [ ] About Enquiry
  - [ ] Detailed Contact
  - [ ] Coaching Enquiry
  - [ ] Group Session
  - [ ] Youth Program
  - [ ] Schools Demo
  - [ ] Schools Partnership

- [ ] Copy column headers from `GOOGLE_SHEETS_SETUP_GUIDE.md` to each sheet (Row 1)

---

## ✅ Step 2: Set Up Google Apps Script (10 minutes)

- [ ] In your spreadsheet: **Extensions** → **Apps Script**
- [ ] Delete default code
- [ ] Copy entire script from `GOOGLE_SHEETS_SETUP_GUIDE.md` (Step 2)
- [ ] Paste into Apps Script editor
- [ ] Click **Save** 💾 (name it "Inner Performance Form Handler")

---

## ✅ Step 3: Deploy Web App (5 minutes)

- [ ] Click **Deploy** → **New deployment**
- [ ] Click gear icon ⚙️ → Select **Web app**
- [ ] Configure:
  - Description: `Form handler v1`
  - Execute as: `Me`
  - Who has access: `Anyone` ⚠️ IMPORTANT!
- [ ] Click **Deploy**
- [ ] Click **Authorize access**
- [ ] Choose your Google account
- [ ] Click **Advanced** → **Go to ... (unsafe)**
- [ ] Click **Allow**
- [ ] **COPY THE WEB APP URL** 📋 (looks like: `https://script.google.com/macros/s/...`)

---

## ✅ Step 4: Update Your Website Code (2 minutes)

- [ ] Open `js/form-handler.js`
- [ ] Find line 6: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
- [ ] Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your actual Web App URL
- [ ] **Save the file**

---

## ✅ Step 5: Upload Files (3 minutes)

Upload these files to your web server:

**All pages (already updated with script tag):**
- [ ] index.html
- [ ] about.html
- [ ] contact.html
- [ ] coaching.html
- [ ] group.html
- [ ] youth.html
- [ ] schools.html

**JavaScript file:**
- [ ] js/form-handler.js (with your Web App URL)

---

## ✅ Step 6: Test Each Form (5 minutes)

Visit your website and test each form:

- [ ] **Homepage** (index.html) - Fill out contact form → Submit
- [ ] **About Page** (about.html) - Fill out enquiry form → Submit
- [ ] **Contact Page** (contact.html) - Fill out detailed form → Submit
- [ ] **Coaching** (coaching.html) - Fill out coaching form → Submit
- [ ] **Group Sessions** (group.html) - Fill out group form → Submit
- [ ] **Youth** (youth.html) - Fill out youth form → Submit
- [ ] **Schools - Demo** (schools.html) - Fill out demo form → Submit
- [ ] **Schools - Partnership** (schools.html) - Fill out partnership form → Submit

### ✅ Check Results:
- [ ] Open your Google Spreadsheet
- [ ] Verify data appears in correct sheets
- [ ] Check timestamps are correct
- [ ] Verify all fields are populated

---

## 🎉 Success!

If all forms submit successfully and data appears in your Google Sheet, you're done!

### Optional Enhancements:

- [ ] Enable email notifications (see guide Step "Enable Email Notifications")
- [ ] Set up data validation in sheets
- [ ] Create dashboard/charts for analytics
- [ ] Export data regularly for backup

---

## ⚠️ Troubleshooting

**Form not submitting?**
1. Open browser console (F12) and check for errors
2. Verify Web App URL in `js/form-handler.js`
3. Ensure Web App deployment has "Anyone" access

**Data not in sheets?**
1. Check sheet names match exactly (case-sensitive)
2. Review Google Apps Script Executions log
3. Verify column headers match guide

**Still having issues?**
- Review full guide: `GOOGLE_SHEETS_SETUP_GUIDE.md`
- Check form field names match script
- Test with one form first

---

## 📚 Documentation Files

- `GOOGLE_SHEETS_SETUP_GUIDE.md` - Detailed step-by-step instructions
- `FORMS_SUMMARY.md` - Overview of all 8 forms
- `QUICK_START_CHECKLIST.md` - This file

---

**Estimated Total Time:** 30 minutes

**Good luck! 🚀**


