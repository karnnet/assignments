$(() => {
    var productClickedIndex;
    var products = [];
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
        resetForm();
    });
    $('#product_list').on('click', 'tr', function() {
        productClickedIndex = $(this).index();
        $('#product_name').val($(this).children('.product-name').text());
        $('#quantity').val($(this).children('.product-quantity').text());
        $("#price").val($(this).children('.product-price').text());
        $('#product_submit').text('Update');
    });
    $('#product_list').on('click', 'tr td i', function(event) {
        var productIndex = $(this).parent('tr').index();
        products.splice(productIndex, 1);
        clearProductList();
        renderProductList();
        event.stopPropagation();
    });

    function resetForm() {
        $('#product_name').val('');
        $('#quantity').val('1'); // After append the data and clear input box.
        $('#price').val('');
        $('#product_submit').text('Add');
        productClickedIndex = -1;
    }
    // Clear task list from DOM
    function clearProductList() {
        $('#product_list').text('');
        $('#product_total').text('');
    }

    function validate(productName, productQuantity, productPrice) {
        if (productName == '' || productQuantity == '' || productPrice == '') {
            alert('Product detail input is required.');
            return false;
        }
        if (!productPrice.match('^-?\\d*(\\.\\d+)?$')) {
            alert('enter only number');
            return false;
        }
        return true
    }

    function renderProductList() {
        var productTotal = 0;
        products.forEach(function(product) {
            $('#product_list').append(`<tr>
            <td class='product-name'>${product.name}</td>
            <td class='product-quantity'>${product.quantity}</td>
            <td class='product-price'>${product.price}</td>
            <td class='product-subtotal'>${product.quantity*product.price}</td>
            <td><i class="fa-solid fa-trash align-right"></i></td>
            </tr>`);
            productTotal += product.quantity * product.price;
        });
        $('#product_total').text(productTotal);
    }
});