$(() => {
    var ProductArray = [];
    $('.productdetail-submit').on('click', function() {
        var productName = $('#product-name').val();
        var Quantity = $('#quantity').val();
        var Price = $('#price').val();
        if (productName == '' || Quantity == '' || Price == '') {
            alert('product detail input is required.');
            return;
        }
        var ProductObject = {
            ProductName: productName,
            QuantityNo: Quantity,
            QuantityPrice: Price
        }
        ProductArray.push(ProductObject);
        console.log(ProductArray);
        resetForm();
        renderProductList(ProductArray);
    })

    function resetForm() {
        $('#product-name').val(''); // After append the data and clear input box.
        $('#price').val('');
    }

    function renderProductList(ProductItem) {
        for (var i = 0; i < ProductItem.length; i++) {
            $('.product-list').append(`<tr>
        <td>${ProductItem[i].ProductName} </td>
        <td>${ProductItem[i].QuantityNo}</td>
        <td>${ProductItem[i].QuantityPrice} </td>
        </tr>`);
        }
    }
});