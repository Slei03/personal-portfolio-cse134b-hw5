/**
 * Appends template with given template id to dialog.
 * Shows dialog.
 * @param {Dialog} dialog 
 * @param {string} templateId 
 */
export function showDialog(dialog, templateId){
    dialog.innerHTML = '';
    const template = document.getElementById(templateId);
    const clone = template.content.cloneNode(true);
    dialog.appendChild(clone);
    dialog.showModal();
}


/**
 * Sanitizes given string with expressions/values by removing 
 * paired angle brankets and its content from expressions/values.
 * Also applies DOMPurify to string and returns santized string.
 * Referred to: https://wesbos.com/sanitize-html-es6-template-strings 
 * @param {string} strings 
 * @param  {...any} expressions 
 * @returns 
 */
export function cleanString(strings, ...expressions){
    let outputString = ""
                
    expressions.forEach((exp, string_i) => {
        exp = exp.replaceAll(/\<.*?\>/ig, "");
        outputString += `${strings[string_i]}${exp}`
    })
    outputString += strings[strings.length - 1] 
    return DOMPurify.sanitize(outputString)
}