const APIURL = "https://api.portalmec.c3sl.ufpr.br/v1/learning_objects";

const items = document.querySelector(".listaItems");
const paginanation_clicks_events = document.querySelectorAll(".page_id");

var respData={};

getRED(APIURL);

async function getRED(url) {
    const resp = await fetch(url);
    respData = await resp.json();

    for (let index = 12; index < 50; index++) {
        respData[index] = respData[Math.floor(Math.random() * 11)];  
    }
    
    render_page(respData, 0);

    console.log(respData);


}

paginanation_clicks_events.forEach((item, ind) => {
    item.addEventListener("click",function(e){

        //remove id selected page
        paginanation_clicks_events.forEach((item2, ind) => {
            if(item2.id == "selected-page") item2.removeAttribute('id');
        })

        item.id = "selected-page";

        render_page(respData, ind);

    });
});

function render_page(res, id_page){

    while (items.firstChild) items.removeChild(items.firstChild);

    res.forEach((element, ind) => {
        console.log(element);
        if(ind >= id_page*15 && ind < (id_page+1)*15){
            const red_item = document.createElement("li");
            //red_item.classList.add("..");
            //console.log(element.thumbnail);
            var key_word = '';
            for (let index = 0; index < element.tags.length; index++) {
                key_word+= `<span class="key-word">${element.tags[index].name}</span>`;
            }

            red_item.innerHTML = `
            
            <img src="https://api.portalmec.c3sl.ufpr.br${element.thumbnail}" alt="img">
            <div class="itens-div">
                <h2>${element.name}</h2>
                <p><span>Descrição: </span>${element.description}</p>
                <p><span>Autor: </span>${element.author}</p>
                <p><span>Categoria: </span>${element.subjects[0].name}</p>
                <p><a href="${element.default_attachment_location}">acesse aqui</a></p>
                <div class="keyClass">${key_word}</div>
            </div>
                `;

            items.appendChild(red_item);
        }
    });

}

