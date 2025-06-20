const projectContainer = document.querySelector(".my-projects");

function generateMarkup(title, description, tech, repo, liveLink, images) {
    const markup = `
            <div class="project-container">
                <section class="project-section-1">
                    <h2 class="project-title">${title}</h2>
                    <p class="project-description">
                        ${description}
                    </p>
                    <p class="project-techs">
                        ${tech}
                    </p>
                    <div class="project-repo">
                        <a
                            href="${repo}"
                            target="_blank"
                            ><img
                                src="public/github-icon.png"
                                alt="github"
                                class="project-github"
                        /></a>
                        <a
                            class="project-github-link"
                            href="${liveLink}"
                            target="_blank"
                        >
                            <img
                                class="project-link-icon"
                                src="public/link-icon.png"
                                alt=""
                            />
                        </a>
                    </div>
                </section>
                <section class="project-section-2">
                    <img
                        class="project-image"
                        src="${images[0]}"
                        alt=""
                    />
                    <img
                        class="project-image"
                        src="${images[1]}"
                        alt=""
                    />
                </section>
            </div>
`;
    return markup;
}
// "images": [
//     "public/project-images/forkify1.png",
//     "public/project-images/forkify2.png"
// ],
// "title": "FORKIFY",
// "description": "A website for searching, creating, and bookmarking recipes using the Forkify API.",
// "tech": ["JavaScript", "REST API", "HTML/CSS (SASS)"],
// "repo": "https://github.com/thespellbinder2004/CCS-Merch-Site",
// "live-link": "http://ccsmerchsite.ct.ws"
let projectMarkup = "";
fetch("projects.json")
    .then((response) => response.json())
    .then((json) => {
        console.log(json.projects);
        json.projects.forEach((val) => {
            console.log(val);
            projectMarkup += generateMarkup(
                val.title,
                val.description,
                val.tech,
                val.repo,
                val.liveLink,
                val.images
            );
        });
        projectContainer.innerHTML = projectMarkup;
    })
    .catch((err) => console.error("Error loading JSON:", err));
