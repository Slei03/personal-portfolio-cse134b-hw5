import {showDialog, cleanString} from "./customdialog.js"

// Creates blogItems list from valueof locally store 'blog-items' key
// If 'blog-items' key is not locally stored, blogItems list will consist of pre-specified items
let blogItems = JSON.parse(localStorage.getItem("blog-items")) || 
    [
        {title: "This is an example entry", 
         summary: "Feel free to modify or delete this!\n Lorem ipsum dolor sit amet, consectetur adipiscing" +
            " elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            " quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure," +
            " dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur" +
            " sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
         date: new Date().toLocaleString()},
        {title: "Welcome! :)", 
         summary: "Add your blog entry above! Feel free to modify or delete this!", 
         date: new Date().toLocaleString()}
    ];


window.onload = function(){
    
    loadBlogItems(); // Load blog content onto page from blogItems list

    const crudDialog = document.getElementById("crud-dialog");
    
    const cancelDialogBtns = document.getElementsByClassName("cancel-dialog")
    for(let i = 0; i < cancelDialogBtns.length; i++){
        // Close dialog if cancel button clicked for any dialog
        cancelDialogBtns[i].addEventListener("click", ()=>{
            crudDialog.close(); 
        });
    }
    
    document.getElementById("create-btn").addEventListener("click", ()=>{
        showDialog(crudDialog, "create-temp"); // Show create form dialog

        document.getElementById("create-ok").addEventListener("click",()=>{
            crudDialog.close(); // Close create form dialog

            let title = document.getElementById("create-title"); 
            let summary = document.getElementById("create-summary");
            let date = new Date().toLocaleString("en-US"); 

            title = cleanString`${title.value}`.trim();
            summary = cleanString`${summary.value}`.trim();

            if(title.length == 0 || summary.length == 0){
                showDialog(crudDialog, "err-msg"); // If sanitized input empty, show error message
            }else{
                let blogItem = makeBlogItem(title, date, summary, blogItems.length); // Create blog item
                addBlogItem(blogItem, title, date, summary); // Add blog item to blogItems list and to blog content in page
            } 
        });
    });


    /**
     * Load all blog items onto page in the descending date order (latest created/modified comes first)
     */
    function loadBlogItems(){
        document.getElementById("blog-content").innerHTML = "";
        if(blogItems.length == 0){
            document.getElementById("empty-description").style.display = "block"
        }else{
            document.getElementById("empty-description").style.display = "none"
        }
        for(let i = 0; i < blogItems.length; i++){
            let blogItem = makeBlogItem(blogItems[i].title, blogItems[i].date, blogItems[i].summary, i, blogItems[i].modified);
            document.getElementById("blog-content").prepend(blogItem);
        }
    }


    /**
     * Creates a blog item element.
     * @param {string} title 
     * @param {string} date 
     * @param {string} summary 
     * @param {string} itemNum 
     * @param {string} modifiedDate 
     * @returns 
     */
    function makeBlogItem(title, date, summary, itemNum, modifiedDate){

        let listEl = document.createElement("li");
        let contentDiv = document.createElement("div");
        let titlePara = document.createElement("h2");
        let dateDiv = document.createElement("div");
        let datePara = document.createElement("p");
        let summaryPara = document.createElement("p");
        let buttonDiv = document.createElement("div");
        let updateBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        contentDiv.className = "blog-item-content";
        dateDiv.className = "blog-item-dates";
        buttonDiv.className = "blog-item-options";

        updateBtn.innerText = "Update";
        updateBtn.className = "update-btn";
        updateBtn.onclick = ()=>{updateItem(itemNum)};

        deleteBtn.innerText = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = ()=>{deleteItem(itemNum)};

        datePara.innerText = "Created on: " + date;
        summaryPara.innerText = summary;
        titlePara.innerText = title;

        contentDiv.appendChild(titlePara);
        dateDiv.appendChild(datePara);
        if(modifiedDate){ 
            // Create paragraph element for modified date if present
            let modifiedDatePara = document.createElement("p");
            modifiedDatePara.innerText = "Modified on: " + modifiedDate;
            dateDiv.appendChild(modifiedDatePara);
        }
        contentDiv.appendChild(dateDiv);
        contentDiv.appendChild(summaryPara);
        buttonDiv.appendChild(updateBtn);
        buttonDiv.appendChild(deleteBtn);

        listEl.appendChild(contentDiv);
        listEl.appendChild(buttonDiv);

        return listEl;
    }


    /**
     * Appends given blog item HTML Element of li type to blog content in page
     * Adds passed in blog item info (title, date, summary, modifiedDate) to blogItems list
     * Sets local storage with key 'blog-items' to updated blogItems list
     * @param {li} blogItem 
     * @param {string} title 
     * @param {string} date 
     * @param {string} summary 
     * @param {string} modifiedDate 
     */
    function addBlogItem(blogItem, title, date, summary, modifiedDate){
        document.getElementById("blog-content").prepend(blogItem);
        blogItems.push({
            title: title,
            date: date,
            summary: summary,
            modified: modifiedDate
        });

        // Hide empty description now that items are added to blog content in page
        document.getElementById("empty-description").style.display = "none";

        localStorage.setItem("blog-items", JSON.stringify(blogItems));
    }


    /**
     * Allows user to update blog item at specified index in blogItems list and page
     * @param {Number} index 
     */
    function updateItem(index){
        let curItem = blogItems[index]; // Get blog item user wants to update

        // Extract title, summary and date from blog item user wants to update
        document.getElementById("update-title").value = curItem.title;
        document.getElementById("update-summary").value = curItem.summary;
        let date = curItem.date;

        showDialog(crudDialog, "update-temp"); // Show update form dialog

        document.getElementById("update-ok").addEventListener("click", ()=>{
            crudDialog.close(); // Close update form dialog

            let title = document.getElementById("update-title");
            let summary = document.getElementById("update-summary");

            title = cleanString`${title.value}`.trim();
            summary = cleanString`${summary.value}`.trim();

            if(title.length == 0 || summary.length == 0){
                showDialog(crudDialog, "err-msg"); // Show error message if sanitized user input empty
            }else{
                let modifiedDate = new Date().toLocaleString();
                let blogItem = makeBlogItem(title, date, summary, blogItems.length-1, modifiedDate);
                processDelete(index); // Delete current item from blogItems list and remove from page
                addBlogItem(blogItem, title, date, summary, modifiedDate); // Add updated blog item
            } 
        })

    }


    /**
     * Allows user to delete blog item at specified index from blogItems list and page
     * @param {Number} index 
     */
    function deleteItem(index){
        showDialog(crudDialog, "delete-temp"); // Show delete confirmation dialog
        document.getElementById("delete-ok").addEventListener("click", ()=>{
                crudDialog.close(); // Close delete confirmation dialog
                processDelete(index);
        });
    }

    
    /**
     * Performs deletion process of removing blog item at index from blogItems list
     * Updates page with change
     * @param {Number} index 
     */
    function processDelete(index){
        blogItems.splice(index, 1); // Delete blog item at index from blogItems list
        localStorage.setItem("blog-items", JSON.stringify(blogItems));
        loadBlogItems(); // Update blog content in page
    }
}