
jQuery.ajax({
  url: 'https://api.foursquare.com/v2/venues/explore?near=45.5,-122.7&section=food&limit=50&client_id=QT0SUCBNBMPUR2WGKOMWSAMVBCGN4WYRN30VVOAZHMBUM5T3&client_secret=TZOQGZMVTSMAM5D3GE0AEHMHZCFNBNS0IH4EKDBRCIJBRNXW&v=20141002',
  type: 'GET',
  dataType: 'json'
})
.then(function(data){
  console.log(data);
  var venuesArray = data.response.groups[0].items;
  var randomNumber = _.random(0, venuesArray.length - 1);
  console.log(venuesArray);
  console.log(venuesArray[randomNumber]);
}, function(errorThrown){
  console.log(errorThrown);
});