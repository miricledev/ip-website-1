# Website Forms - Google Sheets Integration Summary

## 📊 Forms Overview

Your website has **8 forms** that are now connected to Google Sheets:

| # | Form Name | Page | Form ID | Fields |
|---|-----------|------|---------|--------|
| 1 | Homepage Contact | index.html | `contactForm` | name, email, phone, service, message |
| 2 | About Enquiry | about.html | `contactForm` | name, email, service, message |
| 3 | Detailed Contact | contact.html | `detailedContactForm` | firstName, lastName, email, phone, organization, serviceInterest, experience, goals, timeline, budget, additionalInfo, newsletter, privacy |
| 4 | Coaching Enquiry | coaching.html | `contactForm` | name, email, phone, service, goals |
| 5 | Group Session Enquiry | group.html | `contactForm` | name, organization, email, phone, session-type, group-size, message |
| 6 | Youth Program Enquiry | youth.html | `contactForm` | parent-name, child-name, child-age, email, phone, program-interest, goals |
| 7 | Schools Demo | schools.html | `demoForm` | school-name, contact-name, position, email, phone, school-size, school-type, current-challenges, goals |
| 8 | Schools Partnership | schools.html | `contactForm` | name, school, email, phone, service, message |

---

## ✅ What's Been Done

### 1. Created Form Handler (`js/form-handler.js`)
- ✅ Handles all 8 forms automatically
- ✅ Detects which page the form is on
- ✅ Sends data to Google Sheets via Google Apps Script
- ✅ Shows success/error notifications
- ✅ Resets form after successful submission

### 2. Updated HTML Files
All pages now include the form handler script:
- ✅ index.html
- ✅ about.html
- ✅ contact.html
- ✅ coaching.html
- ✅ group.html
- ✅ youth.html
- ✅ schools.html

### 3. Created Setup Guide
- ✅ Complete step-by-step instructions in `GOOGLE_SHEETS_SETUP_GUIDE.md`
- ✅ Google Apps Script code included
- ✅ Sheet structure defined
- ✅ Column mappings documented

---

## 🚀 Next Steps

### You Need To Do:

1. **Follow the Setup Guide** (`GOOGLE_SHEETS_SETUP_GUIDE.md`)
   - Create Google Spreadsheet
   - Set up Google Apps Script
   - Deploy as Web App
   - Copy the Web App URL

2. **Update `js/form-handler.js`**
   - Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your actual Web App URL

3. **Upload Files to Your Web Server**
   - All HTML files (already updated)
   - `js/form-handler.js` (after adding your URL)

4. **Test Each Form**
   - Visit each page and submit the form
   - Check Google Sheets for the data

---

## 📋 Google Sheets Structure

Your spreadsheet should have these sheets (tabs):

1. **Homepage Contact** - Homepage form submissions
2. **About Enquiry** - About page form submissions
3. **Detailed Contact** - Detailed contact page submissions
4. **Coaching Enquiry** - Coaching page submissions
5. **Group Session** - Group sessions enquiries
6. **Youth Program** - Youth program enquiries
7. **Schools Demo** - Schools demo requests
8. **Schools Partnership** - Schools partnership enquiries

Each submission includes:
- ✅ Timestamp (when submitted)
- ✅ All form fields
- ✅ Page URL (where submitted from)

---

## 🔧 Files Modified

### New Files Created:
- `js/form-handler.js` - Main form handling script
- `GOOGLE_SHEETS_SETUP_GUIDE.md` - Detailed setup instructions
- `FORMS_SUMMARY.md` - This summary file

### Files Updated:
- `index.html` - Added form handler script
- `about.html` - Added form handler script
- `contact.html` - Added form handler script, removed old inline script
- `coaching.html` - Added form handler script
- `group.html` - Added form handler script
- `youth.html` - Added form handler script
- `schools.html` - Added form handler script

---

## 📞 Contact Form Features

All forms now have:
- ✅ **Loading State** - "Sending..." while submitting
- ✅ **Success Feedback** - Green checkmark when successful
- ✅ **Error Handling** - Red error message if failed
- ✅ **Auto Reset** - Form clears after 3 seconds
- ✅ **Notifications** - Slide-in notification messages
- ✅ **Data Tracking** - All submissions timestamped and logged

---

## 🎯 Key Benefits

1. **Centralised Data** - All form submissions in one Google Sheet
2. **Easy Access** - View and export data anytime
3. **No Database Needed** - Simple, free solution
4. **Email Notifications** (Optional) - Get alerts for new submissions
5. **Organised** - Separate sheets for each form type
6. **Timestamps** - Know exactly when each submission came in
7. **Page Tracking** - See which page the submission came from

---

## 💡 Tips

- **Backup Your Data** - Regularly export your Google Sheet
- **Monitor Submissions** - Check the sheet regularly for new enquiries
- **Set Up Notifications** - Enable email alerts in Google Apps Script (optional)
- **Customise Columns** - Add more fields to sheets as needed
- **Create Reports** - Use Google Sheets charts for analytics

---

## ⚠️ Important Notes

1. **Web App URL** - Must be updated in `js/form-handler.js` before going live
2. **Anyone Access** - Web App must be set to "Anyone" access (not "Anyone with the link")
3. **Sheet Names** - Must match exactly (case-sensitive)
4. **Column Order** - Must match the order in Google Apps Script
5. **Form Field Names** - Must match exactly (already set correctly)

---

## 🐛 Troubleshooting

**Forms not submitting?**
- Check browser console for errors (F12)
- Verify Web App URL is correct
- Ensure Web App is deployed with "Anyone" access

**Data not in sheets?**
- Check sheet names match exactly
- Check Google Apps Script execution log
- Verify column headers are correct

**Need help?**
- Review `GOOGLE_SHEETS_SETUP_GUIDE.md`
- Check browser console for errors
- Test with one form first before all forms

---

**Setup Time:** ~20-30 minutes for complete integration

**Ready to go live?** Follow `GOOGLE_SHEETS_SETUP_GUIDE.md` step by step!

