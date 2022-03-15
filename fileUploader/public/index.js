let form = document.getElementById('uploadForm');
form.onsubmit = async (e) => {
    //* Prevent the default behavior of the form submit event, to redirect client to a different page.
    e.preventDefault();
    //* Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".
    let formDataBody = new FormData(form);
    
    await fetch('/upload', {
        method: 'POST',
        body: formDataBody
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(formDataBody);
    });

   
};