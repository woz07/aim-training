const ENGINE = require("raylib");

const window = {
	width: 800,
	height: 800,
	title: "Basic Aim Training | Press ESC to exit",
	fps: 60
};

const player = {
	x: (window.width / 2) - 25,
	y: (window.height / 2) - 25,
	radius: 10,
	score: 0,
	color: ENGINE.WHITE
};

const enemy = {
	x: Math.floor(Math.random() * ((window.width - 30 * 2) - 30 * 2)) + 30,
	y: Math.floor(Math.random() * ((window.height - 30 * 2 - 50) - (50))) + 50,
	radius: 30,
	color: ENGINE.RED
};

ENGINE.InitWindow(window.width, window.height, window.title);
ENGINE.SetTargetFPS(window.fps);

while (!ENGINE.WindowShouldClose() || ENGINE.IsKeyPressed(0x001B)) {
	ENGINE.BeginDrawing();
	ENGINE.ClearBackground(ENGINE.BLACK);
	ENGINE.DrawText("Score: " + player.score, 0, 0, 25, ENGINE.BLUE);
	ENGINE.DrawText("Time: " + Math.floor(ENGINE.GetTime()), 0, 25, 25, ENGINE.YELLOW);
	ENGINE.DrawCircle(player.x, player.y, player.radius, player.color);
	ENGINE.DrawCircle(enemy.x, enemy.y, enemy.radius, enemy.color);
	ENGINE.EndDrawing();

	player.x = ENGINE.GetMouseX();
	player.y = ENGINE.GetMouseY();

	if (ENGINE.CheckCollisionCircles({ x: player.x, y: player.y }, player.radius, { x: enemy.x, y: enemy.y }, enemy.radius)) {
		player.score++;

		enemy.x = Math.floor(Math.random() * ((window.width - enemy.radius - 30) - (enemy.radius + 30))) + (enemy.radius + 30);
		enemy.y = Math.floor(Math.random() * ((window.height - enemy.radius - 30) - (enemy.radius + 50))) + (enemy.radius + 50);
	}
}

ENGINE.CloseWindow();
