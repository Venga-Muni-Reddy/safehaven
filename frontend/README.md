# user authentication
  /auth/signup  ===> signup
  /auth/login   ===> login
  /admin/approve/{id} ===> approval of volunteer and NGO request
  /admin/reject/{id}  ===> rejection of volunteer and NGO request



# Login Page
    Spread operator ==>  The spread operator (...) in JavaScript is used to expand elements of an array or object. It helps in copying, merging, or passing elements easily.

    event.preventDefault() ==> To stop refreshes after submitting form or after clicking links.

    



# Calendar feature

No dont use AI manually volunteer has to provide their dates when they have to free and when they are not available like this I want approach and idea creatively and innovatively.


ChatGPT said:
🌟 Unique & Creative Approach: "Volunteer Smart Calendar"
Instead of an AI-driven system, let’s create a manual yet interactive and engaging Volunteer Calendar, where volunteers can:
✅ Mark availability on specific dates manually.
✅ See available tasks on those dates.
✅ Block time slots for personal tasks or other commitments.
✅ Easily reschedule if their availability changes.
✅ Sync with NGO tasks and receive updates.

🔹 How Volunteers Use It (User Experience)
1️⃣ Volunteer logs in → Sees a calendar view of the month/week.
2️⃣ Clicks on a date → Marks “Available” or “Unavailable” for that day.
3️⃣ Selects available time slots → (e.g., 9 AM – 12 PM, 2 PM – 5 PM).
4️⃣ NGO assigns tasks based on availability.
5️⃣ Volunteer receives a task notification & confirms the assignment.
6️⃣ If plans change, volunteers can drag & drop tasks to another date.
7️⃣ Once the task is completed, they update the status.

🔹 Frontend Implementation (How It Works Visually)
🔹 📅 Interactive Calendar (FullCalendar.js or React Calendar)

A monthly & weekly view with color-coded “Available” & “Unavailable” days.

Tasks appear as draggable cards on available dates.

Volunteers can drag tasks to reschedule.

🔹 🟢 Green = Available | 🔴 Red = Unavailable

Clicking a date toggles availability (like Google Calendar).

Time slots are selectable (morning, afternoon, evening).

🔹 📌 Task View for Volunteers

Volunteers see a list of tasks they can take based on their availability.

They can accept or decline tasks before they are assigned.

🔹 🔔 Notification System

Volunteers get a reminder 24 hours before their scheduled task.

If a volunteer cancels, the NGO gets an alert to reassign the task.

🔹 🔄 Sync with Personal Calendar (Optional)

Volunteers can export their schedule to Google/Outlook Calendar.

🔹 Backend Implementation (How Data is Handled)
🔹 📊 Database (MySQL/MongoDB Tables/Collections)

volunteers → Stores volunteer info & availability.

tasks → Stores case details & status.

calendar_entries → Maps volunteers to tasks and schedules.

🔹 🌐 Backend API (Spring Boot)

POST /volunteer/availability → Saves volunteer’s available dates.

GET /volunteer/tasks → Fetches tasks for available dates.

PUT /volunteer/reschedule → Allows volunteers to change dates.

POST /volunteer/update-status → Updates task progress.

🔹 📡 Real-Time Updates (WebSockets/Firebase Firestore)

If a volunteer updates their availability, the NGO sees it immediately.

When a task is assigned, the volunteer gets an instant notification.

🚀 Why This Approach is Unique & Engaging?
✅ Fully Manual but Interactive → Volunteers actively choose their schedules.
✅ Drag & Drop Flexibility → Volunteers can easily adjust their availability.
✅ Transparent & Efficient → NGOs assign tasks only to available volunteers.
✅ Encourages Commitment → Volunteers are more likely to complete tasks they choose.

This way, volunteers get full control over their time, and NGOs efficiently manage manpower without confusion or last-minute dropouts. 🚀

Would you like a UI wireframe idea for better visualization? 😊






