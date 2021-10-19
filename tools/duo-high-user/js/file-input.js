
const fileInput = document.querySelector('#file-input input[type=file]');
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
        const fileName = document.querySelector('#file-input .file-name');
        fileName.textContent = fileInput.files[0].name;

        fileInput.files[0].text().then( (csv_text) => {
            data = $.csv.toObjects(csv_text);

            logon_count = {};

            data.forEach(logon => {
                email = logon.Email
                if(email in logon_count){
                    logon_count[email]++;
                } else {
                    logon_count[email] = 1;
                }
            });

            // Sort the dictionary by values
            var items = Object.keys(logon_count).map(function(key) {
                return [key, logon_count[key]];
            });
            
            items.sort(function(first, second) {
                return second[1] - first[1];
            });


            final_table_html = '';

            count = 1;            

            total_count = 0;

            items.forEach(item_arr => {
                final_table_html += `<tr> <th class='excluded-from-export'> ${count++} </th>  <td> <a href="mailto:${item_arr[0]}">  ${item_arr[0]} </a> </td> <td> ${item_arr[1]} </td> </tr>\n`
                total_count += item_arr[1];
            });

            $("#analysis-results tbody").html(final_table_html);

            $('#download-csv-button').prop('disabled', false);

            $('#logon-count').html(`<p class="notification is-link is-light is-size-3" style="width: 12em; margin: 0 auto;"> ${total_count} counted logons </p>`)
        });
    }
}


$("#download-csv-button").click(function(){ 
    
    today = new Date();

    year = today.getFullYear();
    month = today.getMonth();
    day = today.getDate();
    date = `${day}-${month}-${year}`

    hours = today.getHours();
    minutes = today.getMinutes();
    seconds = today.getSeconds();
    time = `${hours}-${minutes}-${seconds}`

    $("#analysis-results").table2csv('download', {
        filename:`duo-analysis-result_${date}_${time}.csv`,
        excludeColumns:'.excluded-from-export',
    });
});