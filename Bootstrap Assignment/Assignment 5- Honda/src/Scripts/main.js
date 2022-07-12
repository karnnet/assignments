$(() => {
    getFavoriteVehicles();
    getCustomeVehicles();
    getVehicleInventory();

    function getFavoriteVehicles() {
        $.ajax({
            url: 'https://mocki.io/v1/c9ae2109-42fc-43f6-b7fd-e9ec2d340f16',
            method: 'GET',
            success: function(data) {
                console.log('Favorite vehicles data received');
                renderFavoriteVehicles(data);
            },
            error: function(error) {
                console.log(error);
                alert("There was an error while getting favorite vehicles.");
            }
        });
    }

    function getCustomeVehicles() {
        $.ajax({
            url: 'https://mocki.io/v1/706f8650-bafd-44c4-b134-5bf17b8b81d8',
            method: 'GET',
            success: function(data) {
                console.log('Custom vehicles data received');
                renderCustomVehicles(data);
            },
            error: function(error) {
                console.log(error);
                alert("There was an error while getting custom vehicles.");
            }
        });
    }

    function getVehicleInventory() {
        $.ajax({
            url: 'https://mocki.io/v1/b7dc8d63-ae36-4f1e-96e2-51f78cc508b7',
            method: 'GET',
            success: function(data) {
                console.log('Favorite vehicles data received');
                renderVehicleInventory(data);
            },
            error: function(error) {
                console.log(error);
                alert("There was an error while getting vehicle inventory.");
            }
        });
    }

    function renderFavoriteVehicles(favoriteVehicles) {
        if (!favoriteVehicles) {
            alert("There was an error while getting favorite vehicles.");
            return;
        }
        favoriteVehicles.vehicles.forEach(function(vehicle) {
            $('#favorite_vehicles').append(`
                <div class='card-body p-3'>
                <div class='card-header'>
                    <div class='row text-white'>
                        <div class='col-lg-6'>Saved</div>
                        <div class='col-lg-6 text-end'><i class='fa-solid fa-heart'></i></div>
                    </div>
                </div>
                <div class='car-model p-2'>
                    <h5 class='card-title text-dark'>${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}</h5>
                    <h6 class='card-subtitle mb-2 text-dark'>${vehicle.transmission} ${vehicle.driveTrain}</h6>
                    <div class="card-image">
                    <img class='w-50 text-center' src='${vehicle.photoURLs}' alt=''>
                </div></div>
                <div class='card-text'>
                    <div class='row p-2'>
                        <div class='col-lg-9 color-head'>${vehicle.exteriorColor}</div>
                        <div class='col-lg-3 text-end'><i class='fa fa-circle' style="color:#${vehicle.extColorHexCode}"></i></div>
                    </div>
                    <div class='row p-2'>
                        <div class='col-lg-9 color-head'>${vehicle.interiorColor}</div>
                        <div class='col-lg-3 text-end'><i class='fa fa-circle'></i></div>
                    </div>
                    <div class='row p-2'>
                        <div class='col-lg-8 color-head'>Your price</div>
                        <div class='col-lg-4 text-end'><i class='color-price-light fa fa-dollar-sign'></i>${vehicle.yourPrice}</div>
                    </div>
                    <div class='row p-2'>
                        <div class='col-lg-8 color-head'>Your Lease Payment</div>
                        <div class='col-lg-4 text-end'><i class='fa fa-dollar-sign'></i><b>${vehicle.leasePayment}</b></div>
                    </div>
                    <div class='text-center p-2'><button class='text-white btn-card'>View Details</button></div>
                    <div class='text-center p-2'><i class='text-secondary color-head fa fa-trash'></i></div>
                </div>
            </div>
        </div>          
            `);
        });
        applySlider("#favorite_vehicles");
    }

    function renderCustomVehicles(customVehicles) {
        if (!customVehicles) {
            alert("There was an error while getting custom vehicles.");
            return;
        }
        customVehicles.vehicles.forEach(function(vehicle) {
            $('#custom_vehicles').append(`
                <div class='card-body p-3'>
                <div class='card-header'>
                    <div class='row text-white'>
                        <div class='col-lg-6'>Custom Lease</div>
                        <div class='col-lg-6 text-end'><i class='fa-solid fa-calender'></i></div>
                    </div>
                </div>
                <div class='car-model text-center p-2'>
                    <h5 class='card-title text-dark'>${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>${vehicle.transmission} ${vehicle.driveTrain}</h6>

                    <img class='w-50' src='${vehicle.photoURLs}' alt=''>
                </div>
                <div class=''>
                    <div class='row p-3'>
                        <div class='col-lg-8'>${vehicle.exteriorColor}</div>
                        <div class='col-lg-4 text-end'><i class='fa fa-circle' style="color:#${vehicle.extColorHexCode}"></i></div>
                    </div>
                    <div class='row p-3'>
                        <div class='col-lg-8'>${vehicle.interiorColor}</div>
                        <div class='col-lg-4 text-end'><i class='fa fa-circle'></i></div>
                    </div>
                    <div class='row p-3'>
                        <div class='col-lg-8'>Your price</div>
                        <div class='col-lg-4 text-end'><i class='fa-solid fa-dollar-sign'></i>${vehicle.yourPrice}</div>
                    </div>
                    <div class='row p-3'>
                        <div class='col-lg-8'>Your Lease Payment</div>
                        <div class='col-lg-4 text-end'><i class='fa-solid fa-dollar-sign'></i><b>${vehicle.leasePayment}</b></div>
                    </div>
                    <div class='text-center p-2'><button class='text-white btn-card'>View Details</button></div>
                    <div class='text-center'><i class='text-secondary fa fa-trash'></i></div>
                </div>
            </div>
        </div>          
            `);
        });
        applySlider("#custom_vehicles");
    }

    function renderVehicleInventory(vehicleInventory) {
        if (!vehicleInventory) {
            alert("There was an error while getting vehicle inventory.");
            return;
        }
        vehicleInventory.newModels.forEach(function(newModel) {
            $('#vehicle_inventory').append(`
                    <div class='card-body p-2'>
                    <div class='car-model text-center p-3'>
                        <img class='w-75' src='${newModel.vehicles.photoURLs}' alt=''>
                    </div>
                    <div class="car-inventory-detail">
                    <div class='car-inventory-border p-3'>
                        <h5 class='card-title car-inventory-year text-dark'>${newModel.vehicles.year}</h5>
                        <h6 class='card-subtitle car-inventory-model mb-2'>${newModel.vehicles.make} ${newModel.vehicles.model} ${newModel.vehicles.trim}</h6>
                        <h6 class="car-inventory-price">Lease for $ 267.47 per month <i class="fa-solid fa-circle-info"></i></h6>
                    </div>
                    <div class="row p-2">
                        <div class="col-lg-6">View All Offers <i class="fa-solid fa-circle-chevron-right"></i></div>
                        <div class="col-lg-6">
                            <div class='text-center'><button class='text-white btn-inventory-card'>Explore</button></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            `);
        });
        applySlider("#vehicle_inventory");
    }

    function applySlider(elementId) {
        $(elementId).slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }
});