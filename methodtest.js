import { cleanString } from "./customdialog.js";

window.addEventListener("DOMContentLoaded", ()=>{
        const postBtn = document.getElementById("post-btn");
        const getBtn = document.getElementById("get-btn");
        const putBtn = document.getElementById("put-btn");
        const deleteBtn = document.getElementById("delete-btn");

        let xmlRadio = document.getElementById("xml-radio");

        let outputBox = document.getElementById("response");
        let methodForm = document.getElementById("method-form");

        document.getElementById("id").addEventListener("keypress", (event)=>{
            // Ensures value typed into id in form is a non-negative number
            if(["e", "E", "+", "-"].includes(event.key)){
                event.preventDefault();
            }
        });

        postBtn.addEventListener("click", async ()=>{
            if(!idPresent()){
                outputBox.innerHTML = "Make sure to specify id before making POST Request...";
            } else{
                outputBox.innerHTML = "Making POST Request...";
                let formObj = getFormObj();
                formObj['date'] = new Date().toLocaleString('en-US');

                if(xmlRadio.checked){
                    let promise = new Promise((resolve, reject) => {
                        let xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = () => {
                            if(xhr.readyState == XMLHttpRequest.DONE){
                                if(xhr.status == 200){
                                    resolve(xhr.responseText);
                                } else if(xhr.status == 0){
                                    reject();
                                }
                            }
                        }
                        xhr.open("POST", "https://httpbin.org/post", true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.send(JSON.stringify(formObj));
                    })

                    await promise.then(xhrResponse =>{
                        outputBox.innerHTML = jsonToHtml(JSON.parse(xhrResponse));
                    }).catch(error => {
                        console.error(error);
                        outputBox.innerHTML = "Sorry something went wrong...";
                    });
                } else{
                    await fetch("https://httpbin.org/post", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(formObj),
                    }).then(response => response.json())
                    .then(data => {
                        outputBox.innerHTML = jsonToHtml(data)
                    })
                    .catch(error => {
                        console.error(error);
                        outputBox.innerHTML = "Sorry something went wrong..."
                    });
                }
                methodForm.reset();
            }
        });

        getBtn.addEventListener("click", async ()=>{
            outputBox.innerHTML = "Making GET Request...";
            let queryString = idPresent()? "id=" + getId() : "";

            if(xmlRadio.checked){
                let promise = new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = () => {
                        if(xhr.readyState == XMLHttpRequest.DONE){
                            if(xhr.status == 200){
                                resolve(xhr.responseText);
                            } else if(xhr.status == 0){
                                reject();
                            }
                        }
                    }
                    xhr.open("GET", "https://httpbin.org/get?"+queryString, true);
                    xhr.send();
                })

                await promise.then(xhrResponse =>{
                    outputBox.innerHTML = jsonToHtml(JSON.parse(xhrResponse));
                }).catch(error => {
                    console.error(error);
                    outputBox.innerHTML = "Sorry something went wrong...";
                });                
            } else{
                await fetch("https://httpbin.org/get?"+queryString)
                .then(response => response.json())
                .then(data => {
                    outputBox.innerHTML = jsonToHtml(data)
                })
                .catch(error => {
                    console.error(error);
                    outputBox.innerHTML = "Sorry something went wrong..."
                });
            }
            methodForm.reset();
        });

        putBtn.addEventListener("click", async ()=>{
            if(!idPresent()){
                outputBox.innerHTML = "Make sure to specify id before making PUT Request...";
            } else{
                outputBox.innerHTML = "Making PUT Request...";
                let formObj = getFormObj();
                
                if(xmlRadio.checked){
                    let promise = new Promise((resolve, reject) => {
                        let xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = () => {
                            if(xhr.readyState == XMLHttpRequest.DONE){
                                if(xhr.status == 200){
                                    resolve(xhr.responseText);
                                } else if(xhr.status == 0){
                                    reject();
                                }
                            }
                        }
                        xhr.open("PUT", "https://httpbin.org/put", true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.send(JSON.stringify(formObj));
                    })

                    await promise.then(xhrResponse =>{
                        outputBox.innerHTML = jsonToHtml(JSON.parse(xhrResponse));
                    }).catch(error => {
                        console.error(error);
                        outputBox.innerHTML = "Sorry something went wrong...";
                    });
                } else{
                    await fetch("https://httpbin.org/put", {
                        method: 'PUT',
                        body: JSON.stringify(formObj),
                    }).then(response => response.json())
                    .then(data => {
                        outputBox.innerHTML = jsonToHtml(data)
                    })
                    .catch(error => {
                        console.error(error);
                        outputBox.innerHTML = "Sorry something went wrong..."
                    });
                }
                methodForm.reset();
            }
        });

        deleteBtn.addEventListener("click", async ()=>{
            if(!idPresent()){
                outputBox.innerHTML = "Make sure to specify id before making DELETE Request...";
            } else{
                outputBox.innerHTML = "Making DELETE Request...";
                let queryString = "id=" + getId();

                if(xmlRadio.checked){
                    let promise = new Promise((resolve, reject) => {
                        let xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = () => {
                            if(xhr.readyState == XMLHttpRequest.DONE){
                                if(xhr.status == 200){
                                    resolve(xhr.responseText);
                                } else if(xhr.status == 0){
                                    reject();
                                }
                            }
                        }
                        xhr.open("DELETE", "https://httpbin.org/delete?"+queryString, true);
                        xhr.send();
                    })

                    await promise.then(xhrResponse =>{
                        outputBox.innerHTML = jsonToHtml(JSON.parse(xhrResponse));
                    }).catch(error => {
                        console.error(error);
                        outputBox.innerHTML = "Sorry something went wrong...";
                    });  
                } else{
                    await fetch("https://httpbin.org/delete?"+queryString, {method: 'DELETE'})
                    .then(response => response.json())
                    .then(data => {
                        outputBox.innerHTML = jsonToHtml(data)
                    })
                    .catch(error => {
                        console.error(error);
                        outputBox.innerHTML = "Sorry something went wrong..."
                    });
                }
                methodForm.reset();
            }
        });

        function idPresent(){
            let idVal = document.getElementById("id").value;
            
            return !(idVal == "" || idVal == null)
        }

        function getId(){
            return document.getElementById("id").value;
        }

        function getFormObj(){
            let idVal = cleanString`${document.getElementById("id").value}`;
            let articleNameVal = cleanString`${document.getElementById("name").value}`;
            let articleBodyVal = cleanString`${document.getElementById("body").value}`;

            return {
                id: idVal,
                article_name: articleNameVal,
                article_body: articleBodyVal,
            }
        }

        function jsonToHtml(jsonObject){
            let htmlString = "<table>";
            for(let item in jsonObject){
                htmlString += "<tr>"
                htmlString += "<td>" + item + "</td>"  
                htmlString += "<td>" 
                if(jsonObject[item] instanceof Object){
                    for(let i in jsonObject[item]){
                        htmlString += i + ": " + jsonObject[item][i] + "<br/>"
                    }
                }else{
                    htmlString += jsonObject[item]
                }
                htmlString += "</td>"  
                htmlString += "</tr>"
            }
            htmlString += "</table>";

            return htmlString;
        }

});