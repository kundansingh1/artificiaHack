$(document).ready(function () {
    var dataMod = '';
    var currentResult = '';
    $.ajax({
        type: 'GET',
        url: 'http://aditechsolutions.com/nitesh/artifacia/GetSearchFields.php',
        async: false,
        success: function (data) {
            // console.log(data);
            dataMod = data;

            var formatData = dataMod.map(function (obj) {
                return obj.name;
            });

            // console.log(formatData);

            $('#destination-search-3').autocomplete({
                source: formatData
            });
        }
    });

    $("#searchButton").click(function () {

        var searchValue = $('#destination-search-3').val();
        dataMod.map(function (obj) {
            if (obj.name === searchValue) {
                searchServer(obj);
                return true;
            }
        });
    });

    $("#fileUpload").submit(function (event) {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:4040/api/fileSearch',
            async: false,
            success: function (data) {
                var requestData = data.toString();
                console.log(requestData);
                $.ajax({
                    type: 'GET',
                    url: 'http://aditechsolutions.com/nitesh/artifacia/GetRecomendations.php?ids=' + requestData,
                    async: false,
                    success: function (data) {
                        console.log(data);

                        for (var i = 0; i < data.length; i++) {
                            var prod_id = data[i].id;
                            var prod_name = data[i].prod_name;
                            var price = data[i].price;
                            var url = data[i].url;
                            var location = data[i].location;

                            var appendData = '<div class="col-xss-12 col-xs-6 col-sm-4 col-md-3 place" prod_id="' + prod_id + '">\
                                        <div class="top-destination-item">\
                                            <a>\
                                                <div class="image">\
                                                    <img src="'+ url + '" alt="Top Destinations">\
                                                </div>\
                                                <div class="content">\
                                                    <div class="row gap-10">\
                                                        <div class="col-xs-7 place">\
                                                            <h4>' + prod_name + '</h4>\
                                                            <p>'+ location + '</p>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </a>\
                                        </div>\
                                    </div>';
                            $("#apiResults .gap-20").append(appendData);
                        }
                    }
                });
            }
        });

    })

}); // document.ready();

function searchServer(obj) {
    $.ajax({
        type: 'GET',
        url: 'http://aditechsolutions.com/nitesh/artifacia/Search.php?name=' + obj.name + '&type=' + obj.type,
        async: false,
        success: function (data) {
            currentResult = data;

            // console.log(currentResult);

            $("#broadResult").show();
            $("#top-destination-wrapper .gap-20").html("");
            $("#soloResultContainer").html("");

            // console.log(data);

            for (var i = 0; i < data.length; i++) {
                var prod_id = data[i].id;
                var prod_name = data[i].prod_name;
                var price = data[i].price;
                var url = data[i].url;
                var location = data[i].location;

                var appendData = '<div class="col-xss-12 col-xs-6 col-sm-4 col-md-3 place" prod_id="' + prod_id + '">\
							<div class="top-destination-item">\
								<a>\
									<div class="image">\
										<img src="'+ url + '" alt="Top Destinations">\
									</div>\
									<div class="content">\
										<div class="row gap-10">\
											<div class="col-xs-7 place">\
												<h4>' + prod_name + '</h4>\
												<p>'+ location + '</p>\
											</div>\
										</div>\
									</div>\
								</a>\
							</div>\
						</div>';
                $("#top-destination-wrapper .gap-20").append(appendData);
            }

            $('.place').click(function () {

                var prod_id = $(this).attr('prod_id');
                $("#apiResultContainer").show();


                currentResult.map(function (obj) {
                    if (obj.id === prod_id) {
                        var appendData = '<div class="hotel-item-list">\
                                            <div class="image" style="background-image:url('+ obj.url + ');"></div>\
                                            <div class="content">\
                                                <div class="heading">\
                                                    <h4>'+ obj.prod_name + '</h4>\
                                                    <p><i class="fa fa-map-marker text-primary"></i> '+ obj.location + '</p>\
                                                </div>\
                                                <div class="short-info">\
                                                    Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion reasonably. Carriage we husbands advanced an perceive greatest expense on demesne ye he.\
                                                </div>\
                                            </div>\
                                            <div class="absolute-bottom">\
                                                <p class="text-primary"><i class="fa fa-check-circle"></i> '+ obj.category + ' <span class="mh-10">|</span> <i class="fa fa-check-circle"></i> ' + obj.pattern + '</p>\
                                            </div>\
                                            <div class="absolute-right">\
                                                <div class="price-wrapper">\
                                                    <p class="price"><span class="block">start from</span><span class="number">$'+ obj.price + '</span> <span class="block">avg / night</span></p>\
                                                    <a href="#" class="btn btn-danger btn-sm">Details</a>\
                                                </div>\
                                            </div>\
                                        </div>';

                        $("#soloResultContainer").show();

                        $("#soloResultContainer").html(appendData);
                        $("#apiResults .gap-20").html("");


                        $.ajax({
                            type: 'GET',
                            url: 'http://localhost:4040/api/' + prod_id,
                            async: false,
                            success: function (data) {
                                var requestData = data.prod_ids.toString();

                                $.ajax({
                                    type: 'GET',
                                    url: 'http://aditechsolutions.com/nitesh/artifacia/GetRecomendations.php?ids=' + requestData,
                                    async: false,
                                    success: function (data) {
                                        console.log(data);

                                        for (var i = 0; i < data.length; i++) {
                                            var prod_id = data[i].id;
                                            var prod_name = data[i].prod_name;
                                            var price = data[i].price;
                                            var url = data[i].url;
                                            var location = data[i].location;

                                            var appendData = '<div class="col-xss-12 col-xs-6 col-sm-4 col-md-3 place" prod_id="' + prod_id + '">\
                                        <div class="top-destination-item">\
                                            <a>\
                                                <div class="image">\
                                                    <img src="'+ url + '" alt="Top Destinations">\
                                                </div>\
                                                <div class="content">\
                                                    <div class="row gap-10">\
                                                        <div class="col-xs-7 place">\
                                                            <h4>' + prod_name + '</h4>\
                                                            <p>'+ location + '</p>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </a>\
                                        </div>\
                                    </div>';
                                            $("#apiResults .gap-20").append(appendData);
                                        }
                                    }
                                });

                            }
                        });


                        // alert();

                        // var num = 4;
                        // var filters = { 'category': 1, 'pattern': 1 };

                        // var baseUrl = 'https://api.artifacia.com/v1/recommendation/similar/' + prod_id + '/' + num + '?';

                        // for (var key in filters) {
                        //     baseUrl = baseUrl + key + '=' + filters[key] + '&'
                        // }

                        // console.log(baseUrl);

                        // $.ajax({
                        //     type: 'GET',
                        //     beforeSend: function (request) {
                        //         request.setRequestHeader("Authority", authorizationToken);
                        //     },
                        //     url: baseUrl,
                        //     async: false,
                        //     success: function (data) {
                        //         console.log(data);
                        //     }
                        // });

                        return true;
                    }
                });
            })
        }
    });
}