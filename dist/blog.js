const baseGithubUrl = "https://raw.githubusercontent.com/nothua/nothua-blog/main/";
const homeGithubUrl = baseGithubUrl + "home.json";

document.addEventListener("DOMContentLoaded", () => {
    const urlWithCacheBuster = `${homeGithubUrl}?${new Date().getTime()}`;

    fetch(urlWithCacheBuster, {cache: 'no-store'})
        .then(response => response.json())
        .then(data => {
            const blogPostsContainer = document.querySelector('.blog-posts');
            blogPostsContainer.innerHTML = '';

            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');
                
                const img = document.createElement('img');
                img.src = baseGithubUrl + post.image;
                img.alt = '';
                postElement.appendChild(img);
                
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('blog-content');
                
                const title = document.createElement('h2');
                title.textContent = post.title;
                contentDiv.appendChild(title);
                
                const shortDesc = document.createElement('p');
                shortDesc.textContent = post.short_description;
                contentDiv.appendChild(shortDesc);
                
                const readMoreLink = document.createElement('a');
                readMoreLink.href = '/blog_page?' + post.blog;
                readMoreLink.classList.add('btn');
                readMoreLink.textContent = 'Read More';
                contentDiv.appendChild(readMoreLink);
                
                postElement.appendChild(contentDiv);
                blogPostsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching blog data:', error);
        });
});