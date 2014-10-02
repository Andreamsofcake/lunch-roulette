var restaurant = new Object()

restaurant.photo;
restaurant.name;
restaurant.price;
restaurant.rating;
restaurant.hours;
restaurant.phone;
restaurant.quote;
restaurant.menu;
restaurant.location;

jQuery.ajax({
  url: 'https://api.foursquare.com/v2/venues/explore?near=45.5,-122.7&venuePhotos=1&section=food&limit=50&client_id=QT0SUCBNBMPUR2WGKOMWSAMVBCGN4WYRN30VVOAZHMBUM5T3&client_secret=TZOQGZMVTSMAM5D3GE0AEHMHZCFNBNS0IH4EKDBRCIJBRNXW&v=20141002',
  type: 'GET',
  dataType: 'json'
})
.then(function(data){
  // Creates random restaurant object based on array of venues.
  var venuesArray = data.response.groups[0].items;
  var randomNumber = _.random(0, venuesArray.length - 1);
  var randomRestaurant = venuesArray[randomNumber];
  // Creates usable photo URL based on the random restaurant.
  console.log(randomRestaurant);
  var photo = randomRestaurant.venue.photos.groups[0].items[0];
  restaurant.photo = photo.prefix + photo.width + 'x' + photo.height + photo.suffix;
  // Gets restaurant name.
  restaurant.name = randomRestaurant.venue.name;
  // Get restaurant price.
  restaurant.price = randomRestaurant.venue.price.currency;
  // Get restaurant rating.
  restaurant.rating = randomRestaurant.venue.rating;
  // Get restaurant hours.
  restaurant.hours = randomRestaurant.venue.hours.status;
  // Get restaurant phone number.
  restaurant.phone = randomRestaurant.venue.contact.formattedPhone;
  // Get short quote about restaurant from user.
  restaurant.quote = randomRestaurant.tips[0].text;
  // Get link to menu.
  restaurant.menu = randomRestaurant.venue.menu.mobileUrl;
  // Get restaurant longitude and latitude.
  restaurant.location = randomRestaurant.venue.location;
}, function(errorThrown){
  console.log(errorThrown);
})
.then(function(){
  console.log(restaurant);
});

