// http://myapp.com/javascripts/jst.js
window.JST = {};

window.JST['template/posts/index'] = _.template(
    "<ul id='post-list'>
	<% posts.each(function (post){ %>
		<li>
			<ul class='post-list-item'>
				<li><img class='title-img' src=<%= this.options.users[post['userId']]['pic']%>></img></li>
				<li>
					<h4 class='title'><%= this.options.users[post['userId']]['username']%></h4>
					<p><%= post['content']%></p>
				</li>
			</ul>
		</li>
	<% }); %>
</ul>"
);

window.JST['person/edit'] = _.template(
    "<form method='post'><input type..."
);