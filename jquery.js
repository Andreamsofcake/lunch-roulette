
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
  if (restaurant.hasMenu === true) {
    restaurant.menu = venue.menu.mobileUrl;
  } else {
    restaurant.menu = "#";
  }
  restaurant.location = venue.location;
  var latLng = restaurant.location.lat + ',' + restaurant.location.lng;
  restaurant.mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latLng + '&zoom=17&size=400x400&markers=|' + latLng + '|';
  return restaurant;
};

/**
 * Make divs and stuff to display everything rul awezome like.
 * @param  {Restaurant} restaurant [description]
 * @return {[type]}            [description]
 */
var displayRestaurant = function(restaurant) {
  $('.restaurant-name').text(restaurant.name);
  $('.restaurant-quote').text(restaurant.quote);
  $('.restaurant-price').text(restaurant.price);
  $('.restaurant-rating').text(restaurant.rating);
  $('.restaurant-hours').text(restaurant.hours);
  $('.restaurant-phone').text(restaurant.phone);
  $('.restaurant-photo').attr('src', restaurant.photo);
  $('.menu-button').attr('href', restaurant.menu);
  $('.google-map').attr('src', restaurant.mapUrl);
  $('.restaurant-loaded').show();
};

var findRestaurant = function(location) {

  jQuery.ajax({
    url: 'https://api.foursquare.com/v2/venues/explore?near='+ location +'&venuePhotos=1&section=food&limit=50&client_id=QT0SUCBNBMPUR2WGKOMWSAMVBCGN4WYRN30VVOAZHMBUM5T3&client_secret=TZOQGZMVTSMAM5D3GE0AEHMHZCFNBNS0IH4EKDBRCIJBRNXW&v=20141002',
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
};

/*
 * TODO: Document this function call
 * 
 */
var findMeSomeFood = function () {

    function success(position) {
      var latitude = (position.coords.latitude).toFixed(2);
      var longitude = (position.coords.longitude).toFixed(2);
      var location = latitude.toString() + ',' + longitude.toString();
      findRestaurant(location);
      console.log(location);
    };

    function error(error) {
      var defaultLocation = '45.5,-122.7';
      console.log(error);
      findRestaurant(defaultLocation);
    };

  navigator.geolocation.getCurrentPosition(success, error);
};

findMeSomeFood();
'something'