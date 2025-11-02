// ===== Date & Last Modified =====
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ===== Responsive Navigation =====
const menuButton = document.getElementById('menuButton');
const navMenu = document.querySelector('#navMenu ul');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// ===== Course Data =====
const courses = [
  { code: 'WDD130', name: 'Web Fundamentals', credits: 3, category: 'WDD', completed: true },
  { code: 'WDD131', name: 'Dynamic Web Fundamentals', credits: 3, category: 'WDD', completed: true },
  { code: 'WDD231', name: 'Frontend Web Development', credits: 3, category: 'WDD', completed: false },
  { code: 'CSE110', name: 'Introduction to Programming', credits: 2, category: 'CSE', completed: true },
  { code: 'CSE210', name: 'Programming with Classes', credits: 2, category: 'CSE', completed: false }
];

const courseContainer = document.getElementById('courseContainer');
const totalCredits = document.getElementById('totalCredits');

function displayCourses(filteredCourses) {
  courseContainer.innerHTML = '';
  let total = 0;

  filteredCourses.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p>`;
    card.style.backgroundColor = course.completed ? '#c8e6c9' : '#bbdefb';
    courseContainer.appendChild(card);
    total += course.credits;
  });

  totalCredits.textContent = `The total credits for course listed above is ${total}`;
}

displayCourses(courses);

document.getElementById('allCourses').addEventListener('click', () => displayCourses(courses));
document.getElementById('cseCourses').addEventListener('click', () => displayCourses(courses.filter(c => c.category === 'CSE')));
document.getElementById('wddCourses').addEventListener('click', () => displayCourses(courses.filter(c => c.category === 'WDD')));
