// Routes
app.get("/", function (req, res) {
    res.render("index", { val: true });
});