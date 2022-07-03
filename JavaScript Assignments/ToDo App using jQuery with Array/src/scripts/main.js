$(() => {
    var taskClickedIndex;
    var toDoList = [];

    // Add or Update Task. If Button text is Add, create task, or else update task.
    $('#task_submit').on('click', function() {
        var taskInputText = $('#task_input').val();
        if (taskInputText == '') {
            alert('Task input is required.');
            return;
        }

        var taskButtonText = $('#task_submit').text();
        if (taskButtonText == 'Add') {
            toDoList.push(taskInputText);
        } else {
            toDoList[taskClickedIndex] = taskInputText;
        }
        clearList();
        renderList(toDoList);
        resetForm();
    });

    // Bring the value of clicked list item to text box and change button text to "Update"
    $('#task_list').on('click', 'li ', function() {
        taskClickedIndex = $(this).index();
        var task = $(this).children('span').text();
        $('#task_input').val(task);
        $('#task_submit').text('Update');
    });

    // When delete icon is clicked, delete the containing li/task. Stop bubbling or propagation to parent/above handler.
    $('#task_list').on('click', 'li i', function(event) {
        var taskIndex = $(this).parent('li').index();
        toDoList.splice(taskIndex, 1);
        clearList();
        renderList(toDoList);
        event.stopPropagation();
    });

    // Clear task list from DOM.
    function clearList() {
        $('#task_list').text('');
    }

    // Render task list from gloabl variable: toDoList array. 
    function renderList(toDoList) {
        toDoList.forEach(function(toDoItem) {
            $('#task_list').append('<li><span>' + toDoItem + '</span> <i class="fa-solid fa-trash align-right"></i></li>');
        });
    }

    // Reset form elements and clicked element index to their original state. 
    function resetForm() {
        $('#task_input').val(''); // After append the data and clear input box.
        $('#task_submit').text('Add');
        taskClickedIndex = -1;
    }
});