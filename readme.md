<h2> Board Master </h2>

<h3> Endpoints overview </h3>

| HTTP Method |                    URL Path                   |           Description           | JSON |
|:-----------:|:---------------------------------------------:|:-------------------------------:|:----:|
|     GET     |                       /                       |            Home page            |      |
|     GET     |                     /login                    |            Login page           |      |
|     POST    |                     /login                    |            Login page           |      |
|     GET     |                    /signup                    |       New user form render      |      |
|     POST    |                    /signup                    |      New user form handler      |      |
|     POST    |              /logout/{{user_id}}              |           Logout page           |      |
|     GET     |               /games/categories               |        Games categories         |      |
|     GET     | /games/list/{{category_id}}/{{category_name}} |           Games list            |      |
|     GET     |           /games/details/{{game_id}}          |          Game details           |      |
|     POST    |          /games/add-game/{{game_id}}          |   Add a game from your profile  |      |
|     POST    |         /games/delete-game/{{game_id}}        | Remove a game from your profile |      |
|     POST    |                 /games/search                 |  Search for a game by its name  |      |
|     GET     |           /users/profile/{{user_id}}          |       User profile render       |      |
|     GET     |            /users/edit/{{user_id}}            |      Edit user form render      |      |
|     POST    |            /users/edit/{{user_id}}            |      Edit user form handler     |      |
|     POST    |           /users/delete/{{user_id}}           |     Delete user form render     |      |
|     GET     |                   /community                  |          Friends list           |      |
|     GET     |        /community/details/{{friend_id}}       |         Friends details         |      |
|     POST    |      /community/add-friend/{{friend_id}}      |         Add a new friend        |      |
|     POST    |     /community/remove-friend/{{friend_id}}    |         Remove a friend         |      |
|     GET     |                    /events                    |           Events list           |      |
|     GET     |         /events/create/{{id}}/{{name}}        |      New event form render      |      |
|     POST    |         /events/create/{{id}}/{{name}}        |      New event form handler     |      |
|     GET     |           /events/edit/{{event_id}}           |      Edit event form render     |      |
|     POST    |           /events/edit/{{event_id}}           |     Edit event form handler     |      |
|     POST    |          /events/delete/{{event_id}}          |           Delete event          |      |
|     GET     |          /events/details/{{event_id}}         |          Event details          |      |
|     GET     |         /events/joinEvent/{{event_id}}        |    Join an event as attendee    |      |
|     GET     |       /events/withdrawEvent/{{event_id}}      |          Drop an event          |      |
|     GET     |                  /api/events                  |           Events list           |   ✅  |