/**
 * Form Handler for Google Sheets Integration
 * Handles all form submissions across the website
 */

// ⚠️ REPLACE THIS with your Google Apps Script Web App URL after deployment
// Get it from: Deploy > New deployment > Web app > Copy the URL (ends with /exec)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycgGpaX0Kte6UKSMhSJeimvCBFjwmIGmITQQN1V6e4ZI5zCkKQ9e29JnAdQVOtSlNY/exec';

/**
 * Submit form to Google Sheets via hidden form POST (avoids CORS issues)
 * @param {Event} e - Form submit event
 * @param {string} formType - Type of form being submitted
 */
function handleFormSubmit(e, formType) {
    e.preventDefault();
    
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        showNotification('Form submission is not configured yet. Please add your Google Script URL to form-handler.js', 'error');
        return;
    }
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Create hidden iframe for form submission (avoids CORS)
    let iframe = document.getElementById('form-submit-iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'form-submit-iframe';
        iframe.name = 'form-submit-iframe';
        iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden;';
        document.body.appendChild(iframe);
    }
    
    // Create a temporary form to POST to Google Apps Script
    const submitForm = document.createElement('form');
    submitForm.method = 'POST';
    submitForm.action = GOOGLE_SCRIPT_URL;
    submitForm.target = 'form-submit-iframe';
    submitForm.style.display = 'none';
    
    // Add metadata
    const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        submitForm.appendChild(input);
    };
    
    addField('formType', formType);
    addField('pageUrl', window.location.href);
    addField('timestamp', new Date().toISOString());
    
    // Add all form fields
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
        addField(key, value);
    }
    
    document.body.appendChild(submitForm);
    submitForm.submit();
    document.body.removeChild(submitForm);
    
    // Show success (form POST is reliable - assume it worked)
    submitBtn.textContent = '✓ Sent Successfully!';
    submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
    showNotification('Thank you! Your enquiry has been sent successfully. We\'ll respond within 24 hours.', 'success');
    
    form.reset();
    
    setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 3000);
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success/error)
 */
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '0.5rem';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    notification.style.maxWidth = '400px';
    notification.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Initialize form handlers when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    // Homepage Contact Form (index.html or root)
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '') {
        const form = document.getElementById('contactForm');
        if (form) form.addEventListener('submit', (e) => handleFormSubmit(e, 'Homepage Contact'));
    }
    
    // About Page Contact Form (about.html)
    else if (currentPage.includes('about.html')) {
        const form = document.getElementById('contactForm');
        if (form) form.addEventListener('submit', (e) => handleFormSubmit(e, 'About Enquiry'));
    }
    
    // Detailed Contact Form (contact.html)
    else if (currentPage.includes('contact.html')) {
        const form = document.getElementById('detailedContactForm');
        if (form) form.addEventListener('submit', (e) => handleFormSubmit(e, 'Detailed Contact'));
    }
    
    // Coaching Page Contact Form (coaching.html)
    else if (currentPage.includes('coaching.html')) {
        const form = document.getElementById('contactForm');
        if (form) form.addEventListener('submit', (e) => handleFormSubmit(e, 'Coaching Enquiry'));
    }
    
    // Group Sessions Page Form (group.html)
    else if (currentPage.includes('group.html')) {
        const form = document.getElementById('contactForm');
        if (form) form.addEventListener('submit', (e) => handleFormSubmit(e, 'Group Session Enquiry'));
    }
    
    // Youth Development Page Form (youth.html)
    else if (currentPage.includes('youth.html')) {
        const form = document.getElementById('contactForm');
        if (form) form.addEventListener('submit', (e) => handleFormSubmit(e, 'Youth Program Enquiry'));
    }
    
    // Schools Page Forms (schools.html has 2 forms)
    else if (currentPage.includes('schools.html')) {
        const demoForm = document.getElementById('demoForm');
        if (demoForm) demoForm.addEventListener('submit', (e) => handleFormSubmit(e, 'Schools Demo'));
        
        const partnershipForm = document.getElementById('contactForm');
        if (partnershipForm) partnershipForm.addEventListener('submit', (e) => handleFormSubmit(e, 'Schools Partnership'));
    }
});
