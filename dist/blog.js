const baseGithubUrl = "https://raw.githubusercontent.com/nothua/nothua-blog/main/";
const url = window.location.href;
const slug = url.split("/").pop();
const pageGithubUrl = `${baseGithubUrl}blogs/${slug}.json`;

document.addEventListener("DOMContentLoaded", () => {
    const urlWithCacheBuster = `${pageGithubUrl}?${new Date().getTime()}`;
    
    fetch(urlWithCacheBuster, {cache: 'no-store'})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.title = data.title + ' - Blog';
            
            const titleElement = document.getElementById('blog-title');
            titleElement.textContent = data.title;

            const dateElement = document.getElementById('blog-date');
            dateElement.textContent = data.date;

            const shortDescElement = document.getElementById('short-description');
            shortDescElement.innerHTML = data.shortDescription;

            const contentElement = document.getElementById('blog-content');
            contentElement.innerHTML = data.content;

            const imgElement = document.getElementById('blog-image');
            imgElement.src = data.image;
        })
        .catch(error => {
            console.error('Error fetching the blog post:', error);
        });

});