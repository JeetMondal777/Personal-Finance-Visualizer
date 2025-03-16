const http = require("http");
const app = require("./app");
const port = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});