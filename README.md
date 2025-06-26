# CHROME-EXTENSIONFOR-TIME-TRACKINGAND-PRODUCTIVITY-ANALYTICS

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: CHAITANYA PADALGADUTHURI

*INTERN ID*: CT08DM341

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 8 WEEKS

*MENTOR*: NEELA SANTOSH

# Project Description:

This project is a Chrome Extension designed to track user activity across websites and provide comprehensive insights into how time is spent online. It focuses on monitoring web usage behavior, classifying websites as productive or unproductive, and generating visual analytics reports that help users improve digital well-being and productivity.

The extension operates in the background as users browse the internet. It keeps track of which website is currently active and how long the user stays on that site. The time tracking is automatic and starts as soon as the user activates a tab. When a user switches to a different tab or window, or becomes inactive (e.g., browser window loses focus), the extension stops timing and logs the session duration.

# Project Structure:

    📁 time-tracker-productivity-app/
    │
    ├── 📁 extension/
    │   ├── manifest.json
    │   ├── background.js
    │   ├── content.js
    │   ├── options.html
    │   ├── options.js
    │   ├── 📁 icons/
    │   |     ├── icon.png
    │   │     └──📁 icon_files
    │   └──📁  popup/
    │        ├── chart.min.js
    │        ├── popup.html
    │        ├── popup.js
    │        └── style.css
    │
    └── 📁 server/
        ├── node_modules
        ├── server.js
        ├── package-lock.json
        └── package.json  


# Used SQL Schema Script:

    CREATE DATABASE IF NOT EXISTS time_tracker;
    
    USE time_tracker;

    CREATE TABLE `usage_data` (
     id INT AUTO_INCREMENT PRIMARY KEY,
     url VARCHAR(255),
     domain VARCHAR(100),
     duration INT,
     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
     category ENUM('productive', 'unproductive') DEFAULT 'unproductive'
    );

# Key Steps After Complition Of Coding:
1. Open Chrome and go to: chrome://extensions/
2. Enable Developer Mode (top right).
3. Click “Load unpacked”.
4. Select the extension/ folder from your project (D:/INTERNSHIP/TASK4/time-tracker-productivity-app/extension/).
5. Click the extension icon in your Chrome toolbar.

# Other Key Steps:
1. Make sure Server running on http://localhost:5000
2. http://localhost:5000/report for backend is connected or not
# Data collected by the extension includes:

• The URL of the website visited

• The domain name

• The time duration the user spent on the site (in seconds)

• A classification of the site as "productive" or "unproductive"

The classification is based on keyword analysis (e.g., websites like leetcode.com, github.com, and stackoverflow.com are considered productive, while youtube.com, instagram.com, etc., are considered unproductive). This logic can be customized for different use cases.

The extension sends all tracking data to a backend server implemented using Node.js and stores it in a MySQL database. The server exposes APIs that allow data to be recorded and fetched as JSON for use in analytics reports.

The popup interface of the extension (displayed when the user clicks on the extension icon in Chrome) provides a weekly summary chart using Chart.js, a powerful JavaScript charting library. This chart visualizes how much time was spent on various websites and breaks down productivity trends over the last 7 days.

# Styling is done using CSS, keeping the interface clean, readable, and responsive. The popup contains:

• A bar chart showing website usage

• A summary text showing total productive vs unproductive time

# Tech Stack:
# 1.Frontend (Chrome Extension):

• HTML, CSS, JavaScript

• Manifest V3

• Chart.js for data visualization

# 2.Backend:

• Node.js with Express.js

• MySQL for database storage

• CORS and JSON handling

# 3.Chrome Extension APIs:

• chrome.tabs for tab information

• chrome.windows for window focus tracking

• chrome.runtime and chrome.storage for background data management

# Key Features:
• Automatic time tracking of websites visited

• Background activity detection (e.g., when tab/window loses focus)

• Categorization of websites into "productive" and "unproductive"

• Aggregated weekly report generation

• Interactive chart visualization using Chart.js

• Simple and intuitive user interface

• Local server integration for persistent data storage and retrieval

# Use Cases:
• Students who want to monitor study vs entertainment time online

• Remote workers managing screen time and focus during working hours

• Productivity enthusiasts tracking digital habits to optimize performance

• Parents or educators who want to guide responsible web usage

# Challenges Addressed:
• Helps combat digital distraction

• Enables users to reflect on and improve web habits

• Provides measurable insights for better time management

• Encourages accountability in digital environments

# Conclusion:
This Chrome Extension offers a practical and technically robust solution for understanding and improving online productivity. By combining browser automation, backend integration, and data visualization, it delivers a powerful tool for self-monitoring and behavior change. It serves as an excellent project to demonstrate skills in web development, Chrome Extensions, backend APIs, and data analytics, making it suitable for internship portfolios, academic submissions, or even as the foundation for a commercial productivity tool.

# OUT PUT:

When you click on the extesion on the chrome Browser , Which will show the extension by clivking on that extension we can see that how much time we spend on that tab or window.
![Image](https://github.com/user-attachments/assets/b8c74a4b-99ef-4d24-8fea-1a044b3ae197)
