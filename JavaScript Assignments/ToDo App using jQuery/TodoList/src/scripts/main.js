$(() => {
    var taskClicked;
    $('#task_submit').on('click', function() {
        var taskInputText = $('#task_input').val();
        if (taskInputText == '') {
            alert('Task input is required.');
            return;
        }

        var taskButtonText = $('#task_submit').text();
        if (taskButtonText == 'Add') {
            $('#task_list').append(`<li>${taskInputText}</li>`);
        } else {
            taskClicked.text(taskInputText);
        }
        $('#task_input').val(''); // After append the data and clear input box.
        $('#task_submit').text('Add');
        taskClicked = '';
    });
    $('#task_list').on('click', 'li', function() {
        taskClicked = $(this);
        $('#task_input').val(taskClicked.text());
        $('#task_submit').text('Update');
    });
});