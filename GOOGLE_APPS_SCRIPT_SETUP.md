# Google Apps Script Setup Guide for PHENY Portfolio Contact Form

This guide walks you through deploying the Google Apps Script backend to receive contact form inquiries directly in your Gmail inbox (`wasswastephen24@gmail.com`).

---

## Step 1: Open Google Apps Script
1. Open your browser and go to [script.google.com](https://script.google.com).
2. Make sure you are signed in with your personal Google account: **`wasswastephen24@gmail.com`**.
3. Click the **+ New Project** button at the top left.
4. In the top-left title, click **"Untitled project"** and rename it to:
   `PHENY Portfolio Contact Handler`

---

## Step 2: Paste the Backend Code
1. Erase all default code inside the code editor (`Code.gs`).
2. Copy and paste the following complete script:

```javascript
/**
 * PHENY Portfolio — Google Apps Script Contact Form Handler
 * Delivers inquiries directly to wasswastephen24@gmail.com
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for concurrent requests

  try {
    var name = "";
    var email = "";
    var message = "";
    var timestamp = new Date();

    // 1. Extract form parameters (supports JSON, FormData, and URL-encoded)
    if (e && e.postData && e.postData.contents) {
      try {
        var parsed = JSON.parse(e.postData.contents);
        name = parsed.name || "";
        email = parsed.email || "";
        message = parsed.message || "";
      } catch (err) {
        name = (e.parameter && e.parameter.name) || "";
        email = (e.parameter && e.parameter.email) || "";
        message = (e.parameter && e.parameter.message) || "";
      }
    } else if (e && e.parameter) {
      name = e.parameter.name || "";
      email = e.parameter.email || "";
      message = e.parameter.message || "";
    }

    // Basic validation
    if (!name && !email && !message) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: "error", error: "Empty submission" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Prepare and send the email via your Gmail account
    var recipient = "wasswastephen24@gmail.com";
    var subject = "Portfolio Inquiry from " + (name || "Website Visitor");
    
    var body = "You received a new inquiry from your PHENY Portfolio website:\n\n" +
               "Name: " + name + "\n" +
               "Email: " + email + "\n" +
               "Date: " + timestamp.toUTCString() + "\n\n" +
               "Message:\n" + message + "\n\n" +
               "--------------------------------------------------\n" +
               "Reply directly to this email to contact " + (name || "the sender") + ".\n" +
               "Sent securely via PHENY Portfolio Google Apps Script";

    MailApp.sendEmail({
      to: recipient,
      replyTo: email || recipient,
      subject: subject,
      body: body
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Press **Ctrl + S** (or click the disk icon) to save.

---

## Step 3: Deploy as a Web App (Critical Settings)
1. In the top right corner of the Google Apps Script editor, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the fields exactly as follows:
   - **Description:** `PHENY Portfolio Form v1`
   - **Execute as:** `Me (wasswastephen24@gmail.com)`
   - **Who has access:** `Anyone`  *(This is essential so website visitors can submit the form)*
4. Click **Deploy**.
5. Google will ask you to **"Authorize access"**:
   - Click **Authorize access**.
   - Choose your Google account (`wasswastephen24@gmail.com`).
   - If you see a *"Google hasn't verified this app"* screen:
     - Click **Advanced** (small text at bottom left).
     - Click **Go to PHENY Portfolio Contact Handler (unsafe)**.
     - Click **Allow**.
6. Google will now display your **Web app URL**. It looks like this:
   `https://script.google.com/macros/s/AKfycbx.../exec`
7. Click **Copy** to copy this URL.

---

## Step 4: Link to Your Portfolio
1. Open `index.html` in your editor.
2. Locate line ~998:
   ```javascript
   const GOOGLE_SCRIPT_URL = "";
   ```
3. Paste your copied Web App URL inside the quotes:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
   ```
4. Save the file and test submitting the form on your website. The email will arrive in your Gmail inbox immediately!
