function load_results(result_json){
    
    var ir_results_container = document.getElementById('ir-results-container');
    
    var child = ir_results_container.lastElementChild;  
    while (child) { 
        ir_results_container.removeChild(child); 
        child = ir_results_container.lastElementChild; 
    } 
    
    var json_data = JSON.parse(result_json);
    
    if(Object.keys(json_data).length == 0)
        alert("could not detect anything");
    else{
        for(var index=0; index<Object.keys(json_data).length; index++){
            var current_key = Object.keys(json_data)[index];
            var current_product_name = json_data[current_key];

            for(var i=0; i < current_product_name.length; i++){
                var current_product = current_product_name[0];
                var similar_products = current_product["similar_products"];
                for(var j=0; j<similar_products.length; j++){
                    console.log("" + similar_products[j]["img_url"]);

                    var result = document.createElement("div");
                    result.setAttribute("class", "result");

                    var resultImg = document.createElement("div");
                    resultImg.setAttribute("class", "result-img-container");
                    
                    var img = document.createElement("img");
                    img.setAttribute("class", "result-img");
                    img.src = similar_products[j]["img_url"];
                    
                    resultImg.appendChild(img);
                    
                    result.appendChild(resultImg);

                    var a_tag = document.createElement("a");
                    a_tag.setAttribute("class", "img-meta-data");
                    a_tag.setAttribute("href", similar_products[j]["product_url"]);

                    var name_div = document.createElement("div");
                    name_div.innerHTML = similar_products[j]["product_name"];
                    name_div.style.width = "95%";
                    name_div.style.height = "25px";
                    name_div.style.marginLeft = "10px";
                    name_div.style.overflow = "hidden";

                    var website_name_div = document.createElement("div");
                    website_name_div.innerHTML = similar_products[j]["website"];
                    website_name_div.style.width = "95%";
                    website_name_div.style.height = "25px";
                    website_name_div.style.marginLeft = "10px";
                    website_name_div.style.overflow = "hidden";

                    a_tag.appendChild(name_div);
                    a_tag.appendChild(website_name_div);

                    result.appendChild(a_tag);

                    ir_results_container.appendChild(result);
                }
            }
        }
    }
    displayUploadNextButton();
}

function loadResultsPlaceholders(){
    for(var i=0; i<12; i++){
        var ir_results_container = document.getElementById('ir-results-container');
    
        var result = document.createElement("div");
        result.setAttribute("class", "result");

        var resultImg = document.createElement("div");
        resultImg.setAttribute("class", "result-img-container");

        var placeholderImg = document.createElement("img");
        placeholderImg.setAttribute("class", "placeholder-img");

        resultImg.appendChild(placeholderImg);

        var a_tag = document.createElement("a");
        a_tag.setAttribute("class", "img-meta-data");

        var name_div = document.createElement("div");
        name_div.className = "placeholder-meta-data-parent";

        var name_div_child = document.createElement("div");
        name_div_child.className = "placeholder-meta-data";
        name_div_child.style.width = "80%";
        name_div.appendChild(name_div_child);

        var website_name_div = document.createElement("div");
        website_name_div.className = "placeholder-meta-data-parent";

        var website_name_div_child = document.createElement("div");
        website_name_div_child.className = "placeholder-meta-data";
        website_name_div_child.style.width = "60%";
        website_name_div.appendChild(website_name_div_child);


        a_tag.appendChild(name_div);
        a_tag.appendChild(website_name_div);

        result.appendChild(resultImg);
        result.appendChild(a_tag);

        ir_results_container.appendChild(result);
    }
}