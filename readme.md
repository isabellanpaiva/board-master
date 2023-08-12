<h1> Project 2 </h1>

<h3> Endpoints overview </h3>

| HTTP Method |             URL Path            |           Description           | JSON |
|:-----------:|:-------------------------------:|:-------------------------------:|:----:|
|     GET     |                /                |            Home page            |      |
|     GET     |           /games/list           |           Games list            |      |
|     GET     |      /games/details/{{id}}      |          Game details           |      |
|     POST    |      /games/add-game/{{id}}     |   Add a game from your profile  |      |
|     POST    |    /games/delete-game/{{id}}    | Remove a game from your profile |      |
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
|     GET     |          /events/create         |      New event form render      |      |
|     POST    |          /events/create         |      New event form handler     |      |
|     GET     |       /events/edit/{{id}}       |      Edit event form render     |      |
|     POST    |       /events/edit/{{id}}       |     Edit event form handler     |      |
|     POST    |      /events/delete/{{id}}      |           Delete event          |      |
|     GET     |         /community/list         |          Friends list           |      |
|     GET     |    /community/details/{{id}}    |         Friends details         |      |
|     POST    |   /community/add-friend/{{id}}  |         Add a new friend        |      |
|     POST    | /community/delete-friend/{{id}} |         Remove a friend         |      |
|     GET     |            /api/games           |           Games list            |   ✅  |
|     GET     |    /api/games/details/{{id}}    |          Game details           |   ✅  |