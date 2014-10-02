
/**
 * @typedef {Object} Restaurant
 *
 * @property {String} photo - Describe.
 * @property {String} name - Restaurant name.
 * @property {String} price - Restaurant price as a $.
 * @property {Number} rating - Restaurant rating as out of 10.
 * @property {String} hours - When restaurant closes today.
 * @property {String} phone - Restaurant phone number as a (xxx) xxx-xxxx.
 * @property {String} quote - Short quote about restaurant from user.
 * @property {String} menu - URL to mobile menu at Foursquare.
 * @property {Object} location - Location object.
 * @property {Number} location.lat - Latitude.
 * @property {Number} location.lng - Longitude.
 */

/**
 * Make a restaurant from a Foursquare venue and tips.
 *
 * @param  {Objet} venue Direct from Foursquare
 * @param  {Object} tips Direct from Foursquare
 * @return {Restaurant} The restaurant object.
 */
var makeRestaurant = function(venue, tips) {
  var restaurant = {};
  var photo = venue.photos.groups[0].items[0];
  restaurant.photo = photo.prefix + photo.width + 'x' + photo.height + photo.suffix;
  restaurant.name = venue.name;
  restaurant.price = venue.price.currency;
  restaurant.rating = venue.rating;
  restaurant.hours = venue.hours.status;
  restaurant.phone = venue.contact.formattedPhone;
  restaurant.quote = tips[0].text;
  restaurant.menu = venue.menu.mobileUrl;
  restaurant.location = venue.location;
  return restaurant;
};

/**
 * Make divs and stuff to display everything rul awezome like.
 * @param  {Restaurant} restaurant [description]
 * @return {[type]}            [description]
 */
var displayRestaurant = function(restaurant) {
  var name = restaurant.name
  $('<h2>').text(name).addClass('restaurant-name').appendTo('.name-container');
  var photo = restaurant.photo;
  $('<img>').attr('src', photo).addClass('restaurant-photo').appendTo('.photo-container');
  var quote = restaurant.quote;
  $('<p>').text(quote).addClass('restaurant-quote').appendTo('.user-quote');
  var price = restaurant.price;
  $('<p>').text("Price: " + price).addClass('col-md-3').appendTo('.restaurant-info');
  var rating = restaurant.rating;
  $('<p>').text("Rating: " + rating).addClass('col-md-3').appendTo('.restaurant-info');
  var hours = restaurant.hours;
  $('<p>').text(hours).addClass('col-md-3').appendTo('.restaurant-info');
  var phone = restaurant.phone;
  $('<p>').text(phone).addClass('col-md-3').appendTo('.restaurant-info');
  var menu = restaurant.menu;
  $('.menu-button').attr('href', menu);
};

jQuery.ajax({
  url: 'https://api.foursquare.com/v2/venues/explore?near=45.5,-122.7&venuePhotos=1&section=food&limit=50&client_id=QT0SUCBNBMPUR2WGKOMWSAMVBCGN4WYRN30VVOAZHMBUM5T3&client_secret=TZOQGZMVTSMAM5D3GE0AEHMHZCFNBNS0IH4EKDBRCIJBRNXW&v=20141002',
  type: 'GET',
  dataType: 'json'
})
.then(function(data){
  // Creates random restaurant object based on array of objects that contain venues and tips.
  var venuesArray = data.response.groups[0].items;
  var randomNumber = _.random(0, venuesArray.length - 1);
  var randomItem = venuesArray[randomNumber];
  console.log(randomItem);

  var restaurant = makeRestaurant(randomItem.venue, randomItem.tips);
  displayRestaurant(restaurant);

}, function(errorThrown){
  console.log(errorThrown);
});

