# My Fair Fight



MyFairFight is my SPICED Academy Final Project. We were given one week to build anything we wanted.
Check it out on heroku [here](https://myfairfight.herokuapp.com/login#/)! Image uploads aren't working yet as I am currently learning about and setting up Amazon Web Services S3.

### Project Backstory

I started karate 17 years ago, and a couple of years back I joined an organisation called [FairFight](http://www.fairfight.nl/). It aims to empower young girls from underprivileged communities with the mental and physical benefits of martial arts. We find a martial arts instructor from that same community and talk to local schools to get them to offer karate lessons as one of their taught sports.

The girls from both our projects in India and Zimbabwe always look so motivated and happy to train when we're there. I wanted to find a way to make sure they stayed motivated, while also helping us keep track what is happening there.

### App Description

**My Fair Fight** is a both:

- A <u>Motivational App</u> to guide young children throughout their martial arts journey. They can keep track of their progress by posting comments and photos of what they achieved, and they can also receive achievement "badges"/"stickers" from their instructor at different milestones.
- A <u>Content Management System</u> (CMS) for FairFight. FairFight admins can modify which projects are ongoing (in which countries, cities and schools FairFight is active) to edit the options students and teachers can choose from when signing up. Admins can manage the app's users by deleting them. Admins can also keep track of their own and other admin's activity (deleted projects, added projects, deleted users, etc.)

**3 types of users** can access the MyFairFight app:

- <u>A Student</u>: you have to give your age, the country, city and school you are from. You can then access your achievement timeline and your profile.
- <u>A Teacher</u>: you have to say what country you are from so we can match you with the relevant students. You can then access your achievement sending page.
- <u>An admin</u>: you have to submit a secret admin code to be able to create an admin account. You can then access your admin account where you all the CMS features can be accessed.

**Features I woud like to add** in the near future:

- Let admins to see all student's and teacher's pages
- Create a projects statistics page for admins. Display graphs and useful information such as number of students per school, types of belts per city, throughout time, etc. I would like to learn and use D3.js for this.
- Create a calendar for teachers where they can take attendance, and let admins be able to follow trends in attendance.
- Create a diary for the girls where they can let us know how they feel.
- Add csurf.

### Technologies Used

- JavaScript
- Node.js
- Express.js
- Express Router
- React.js
- PostgreSQL
- Bcrypt (for authentication)
- Multer (for image upload)
