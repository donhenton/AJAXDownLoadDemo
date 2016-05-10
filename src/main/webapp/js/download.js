function doDownloadXHR()
{

    var xhr = new XMLHttpRequest();
    xhr.open('POST', fullPath, true);
    $('#loader').css({"visibility":"visible"})
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener("loadend", function()
    {
         console.log("I'm outta here!!!!!")
         $('#loader').css({"visibility":"hidden"})
    })
    xhr.onload = function () {
        if (this.status === 200) {
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1])
                    filename = matches[1].replace(/['"]/g, '');
            }
            var type = xhr.getResponseHeader('Content-Type');
            var a  = null;
            var blob = new Blob([this.response], {type: type});
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (filename) {
                    // use HTML5 a[download] attribute to specify filename
                    a = document.createElement("a");
                    a.setAttribute("id","downLoadLink")
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location = downloadUrl;
                }

                setTimeout(function () {
                    URL.revokeObjectURL(downloadUrl);
                    $('a#downloadLink').remove();
                   
                }, 100); // cleanup
            }
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();




}


function doDownloadJQ()
{

    $.ajax({
        type: "POST",
        url: fullPath,
        data: {"period": 7},
        dataType: 'json',
        processData: false, // Don't process the files
        //contentType: false, //set to false to not send a content-type header
        headers: {'uuid': '18f8afef-daf3-b996-4a0c-4d88e16af19a'},
       // async: false,
        fail: function (jqxhr, status, errorThrown)
        {
            processError(jqxhr, status, errorThrown);
        },
        success: function (response, status, xhr) {
            processCallback(response, status, xhr);
            
        }
    });

     


}

function processError(jqxhr, status, errorThrown)
{
    console.log("error: " + errorThrown);
}

function processCallback(response, status, xhr)
{
    
            // check for a filename
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1])
                    filename = matches[1].replace(/['"]/g, '');
            }

            var type = xhr.getResponseHeader('Content-Type');
            var blob = new Blob([response], {type: type});

            if (typeof window.navigator.msSaveBlob !== 'undefined') {

                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."

                window.navigator.msSaveBlob(blob, filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (filename) {
                    // use HTML5 a[download] attribute to specify filename
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location = downloadUrl;
                }

                setTimeout(function () {
                    URL.revokeObjectURL(downloadUrl);
                }, 100); // cleanup
            }
}