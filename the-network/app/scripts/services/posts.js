app.factory('Post', function($resource){
  return $resource('https://ontra-network.firebaseio.com/posts/:id.json');
});