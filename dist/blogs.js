const baseGithubUrl = "https://raw.githubusercontent.com/nothua/nothua-blog/main/";
const blogsGithubUrl = baseGithubUrl + "blogs.json";

document.addEventListener("DOMContentLoaded", () => {
    const urlWithCacheBuster = `${blogsGithubUrl}?${new Date().getTime()}`;

    fetch(urlWithCacheBuster, {cache: 'no-store'})
        .then(response => response.json())
        .then(data => {
            const blogPostsContainer = document.querySelector('.blog-posts');
            blogPostsContainer.innerHTML = '';

            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');
                
                const img = document.createElement('img');
                img.src = post.image;
                img.alt = '';
                postElement.appendChild(img);
                
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('blog-content');
                
                const title = document.createElement('h2');
                title.textContent = post.title;
                contentDiv.appendChild(title);


                const date = document.createElement('p');
                date.textContent = `Published: ${post.date}`;
                date.classList.add('date');
                contentDiv.appendChild(date);
                
                const shortDesc = document.createElement('p');
                shortDesc.textContent = post.shortDescription;
                contentDiv.appendChild(shortDesc);
                
                const readMoreLink = document.createElement('a');
                readMoreLink.href = '/blog/' + post.slug;
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