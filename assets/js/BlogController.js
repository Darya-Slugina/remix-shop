const blogController = function () {
    // Controller
    const source = document.getElementById("blogArticlesTempl").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(articles);

    let container = document.getElementById("blog-posts");
    container.innerHTML = html;
};