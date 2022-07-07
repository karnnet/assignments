$(() => {
    var productClickedIndex;
    var products = [];
    // Add or Update Task. If Button text is Add, create task, or else update task.
    $('#product_submit').on('click', function() {
        var productName = $('#product_name').val();
        var productQuantity = $('#quantity').val();
        var productPrice = $('#price').val();
        if (!validate(productName, productQuantity, productPrice)) {
            return;
        }
        var product = {
            name: productName,
            quantity: productQuantity,
            price: productPrice,
        }
        if ($('#product_submit').text() == 'Add') {
            products.push(product);
        } else {
            products[productClickedIndex] = product;
        }
        clearProductList();
        renderProductList();
        renderProductCart();
        resetForm();
    });
    // Bring the value of clicked tr to text box and change button text to "Update"
    $('#product_list').on('click', 'tr', function(event) {
        productClickedIndex = $(this).index();
        $('#product_name').val($(this).children('.product-name').text());
        $('#quantity').val($(this).children('.product-quantity').children('input').val());
        $("#price").val($(this).children('.product-price').text());
        $('#product_submit').text('Update');
        event.stopPropagation();
    });

    // When delete icon is clicked, delete the containing tr/task. Stop bubbling or propagation to parent/above handler.
    $('#product_list').on('click', 'tr td .delete', function(event) {
        var productIndex = $(this).parent('tr').index();
        products.splice(productIndex, 1);
        clearProductList();
        renderProductList();
        renderProductCart();
        event.stopPropagation();
    });

    // When quantity changes in product list, update array with changed quantity and re-render lists.
    $('tbody').on('change', 'tr td input', function(event) {
        var quantityIndex = $(this).parents('tr').index();
        var productUpdate = products[quantityIndex];
        productUpdate.quantity = $(this).val();
        clearProductList();
        renderProductList();
        renderProductCart();
        resetForm();
        event.stopPropagation();
    });

    //adding quantity 
    $('tbody').on('click', 'tr td .add', function(event) {
        var productIndexPlus = $(this).parents('tr').index();
        var productUpdateValue = products[productIndexPlus];
        productUpdateValue.quantity = parseInt($(this).siblings('input').val()) + 1;
        clearProductList();
        renderProductList();
        renderProductCart();
        event.stopPropagation();
    });

    //decreasing quantity and removing row when quantity is zero
    $('tbody').on('click', 'tr td .minus', function(event) {
        var productIndexMinus = $(this).parents('tr').index();
        var productUpdateValue = products[productIndexMinus];
        productUpdateValue.quantity = parseInt($(this).siblings('input').val()) - 1;
        if (productUpdateValue.quantity == 0) {
            products.splice(productIndexMinus, 1);
        }
        clearProductList();
        renderProductList();
        renderProductCart();
        event.stopPropagation();
    });

    // Reset form elements and clicked element index to their original state. 
    function resetForm() {
        $('#product_name').val('');
        $('#quantity').val('1'); // After append the data and clear input box.
        $('#price').val('');
        $('#product_submit').text('Add');
        productClickedIndex = -1;
    }

    // Clear task list from DOM.
    function clearProductList() {
        $('#product_list').text('');
        $('#product_total').text('');
        $('#product_cart_list').text('');
        $('#quantity_total').text('');
        $('#product_cart_total').text('');
    }

    //checking validation
    function validate(productName, productQuantity, productPrice) {
        if (productName == '' || productQuantity == '' || productPrice == '') {
            alert('Product detail input is required.');
            return false;
        } else if (!Number(productPrice)) {
            alert('Enter only number');
            return false;
        } else if (productName.match(/ /g)) {
            alert('No whitespaces allowed');
            return false;
        } else if (productPrice.match(/ /g)) {
            alert('No whitespaces allowed');
            return false;
        }
        return true;
    }

    // Render task list from gloabl variable: products array. 
    function renderProductList() {
        var productTotal = 0;
        products.forEach(function(product) {
            $('#product_list').append(`<tr>
            <td class='product-name'>${product.name}</td>
            <td class='product-quantity'><i class="fa fa-minus minus"></i><input type="text" value="${product.quantity}"/><i class="fa fa-plus add"></i></td>
            <td class='product-price'>${product.price}</td>
            <td class='product-subtotal'>${product.quantity*product.price}</td>
            <td><i class="fa-solid fa-trash align-right delete"></i></td>
            </tr>`);
            productTotal += product.quantity * product.price;
        });
        $('#product_total').text(productTotal);
    }

    // Render the product cart
    function renderProductCart() {
        var productTotal = 0;
        var quantityTotal = 0;
        products.forEach(function(product) {
            $('#product_cart_list').append(`<tr>
            <td>${product.quantity} x </td>
            <td>${product.name}</td>
            <td>${product.quantity*product.price}</td>
            </tr>`);
            productTotal += product.quantity * product.price;
            quantityTotal += parseInt(product.quantity);
        });
        $('#quantity_total').text(quantityTotal);
        $('#product_cart_total').text(productTotal);
    }
});