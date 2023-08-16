<h2> Project 2 </h2>

<h3> Endpoints overview </h3>

| HTTP Method |             URL Path            |           Description           | JSON |
|:-----------:|:-------------------------------:|:-------------------------------:|:----:|
|     GET     |                /                |            Home page            |      |
|     GET     |           /games/categorie      |           Games categorie       |      |
|     GET     |           /games/list           |           Games list            |      |
|     GET     |      /games/details/{{id}}      |          Game details           |      |
|     POST    |      /games/add-game/{{id}}     |   Add a game from your profile  |      |
|     POST    |    /games/delete-game/{{id}}    | Remove a game from your profile |      |
|     POST    |           /games/search         | Search for a game by its name   |      |
|     GET     |           /users/login          |            Login page           |      |
|     POST    |           /users/login          |            Login page           |      |
|     GET     |          /users/signup          |       New user form render      |      |
|     POST    |          /users/signup          |      New user form handler      |      |
|     POST    |       /users/logout/{{id}}      |           Logout page           |      |
|     GET     |      /users/profile/{{id}}      |       User profile render       |      |
|     GET     |        /users/edit/{{id}}       |      Edit user form render      |      |
|     POST    |        /users/edit/{{id}}       |      Edit user form handler     |      |
|     POST    |       /users/delete/{{id}}      |     Delete user form render     |      |
|     GET     |           /events/list          |           Events list           |      |
|     GET     |          /events/create/{{id}}  |      New event form render      |      |
|     POST    |          /events/create/{{id}}  |      New event form handler     |      |
|     GET     |       /events/edit/{{id}}       |      Edit event form render     |      |
|     POST    |       /events/edit/{{id}}       |     Edit event form handler     |      |
|     POST    |      /events/delete/{{id}}      |           Delete event          |      |
|     GET     |         /community/list         |          Friends list           |      |
|     GET     |    /community/details/{{id}}    |         Friends details         |      |
|     POST    |   /community/add-friend/{{id}}  |         Add a new friend        |      |
|     POST    | /community/delete-friend/{{id}} |         Remove a friend         |      |
|     GET     |            /api/events           |           Events list          |   ✅  |
|     GET     |    /api/events/details/{{id}}    |          Events details        |   ✅  |