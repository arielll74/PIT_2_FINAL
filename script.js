document.addEventListener("DOMContentLoaded", function () {
    const jsonUrl = " https://arielll74.github.io/PIT_2_FINAL/courses.json";
    const subjectsContainer = document.getElementById("subjects-list");
    const searchInput = document.getElementById("search");

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            displaySubjects(data.subjects);

            searchInput.addEventListener("input", function () {
                const searchTerm = this.value.toLowerCase();
                const filteredSubjects = data.subjects.map(subject => {
                    return {
                        ...subject,
                        courses: subject.courses.filter(course => course.toLowerCase().includes(searchTerm))
                    };
                }).filter(subject => subject.courses.length > 0);

                subjectsContainer.innerHTML = "";
                displaySubjects(filteredSubjects);
            });
        })
        .catch(error => console.error("Error fetching JSON:", error));

    function displaySubjects(subjects) {
        subjects.forEach(entry => {
            let section = document.createElement("div");
            section.innerHTML = `<h3>${entry.year} - ${entry.semester}</h3>
                                 <ul>${entry.courses.map(course => `<li>${course}</li>`).join('')}</ul>`;
            subjectsContainer.appendChild(section);
        });
    }
});
