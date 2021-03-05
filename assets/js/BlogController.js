let articles = {
    articlesTemplates: [
      {
        image: "assets/images/Blog-Vanilla-Kitchen-600x450.jpg",
        title: "CRAZY IN LOVE",
        text: `Месецът на любовта е в разгара си и ние от remixshop.com ви предизвикваме да 
        се развихрите в кухнята и да покажете обичта си към любимите същества… чрез
        храна ❤️ Оставяме ви една бърза и лесна рецепта...`,
        date: "13.02.2021"
      },
      {
        image: "assets/images/Blog-coverblogst-600x450.jpg",
        title: "BUY ME CLOTHES AND I WILL LOVE YOU FOREVER",
        text: `Легендата за Св. Валентин датира още от древен Рим, а днес целият свят
        празнува ЛЮБОВТА. Дали си сингъл, във връзка или някъде по средата, всеки
        намира начин да отбележи празника. Рози, балони във фор...`,
        date: "13.02.2021"
      },
      {
        image: "assets/images/Blog-Kate-Fuks-600x450.jpg",
        title: "Fashion Tips: Kate Fuks",
        text: `Казва се Катерина Фуксова, но всички я наричат Кate Fuks. Тя обича да рисува
        и да майстори от нищото. Твори от 7 години и все още учи нови неща всеки
        ден. Ето как Кейт се представя: „Освен моливите и ...`,
        date: "10.02.2021"
      },
    ],
}; 

const blogController = function () {
    // Controller
    const source = document.getElementById("blogArticlesTempl").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(articles);

    let container = document.getElementById("blog-posts");
    container.innerHTML = html;
};