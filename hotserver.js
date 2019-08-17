// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Hot Resturaunt Tables DATA
// =============================================================
var reservation = [
    {
        uniqueId: "TE",
        name: "Test Erperson",
        email: "test.erperson@notanemail.com",
        phone: "555-1234"
    },
    {
        uniqueId: "FD",
        name: "Front Dev",
        email: "test.erperson@notanemail.com",
        phone: "555-1234"
    }
];

var waiting = [];

//Hot Resturaunt Routes
// =============================================================
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/table", function(req,res){
    res.sendFile(path.join(__dirname,"resview.html"))
});

app.get("/resform", function(req,res){
    res.sendFile(path.join(__dirname, "resform.html"))
});

app.get("/api/reserve", function(req, res) {
    return res.json(reservation);
});

app.get("/api/waitlist", function(req,res){
    return res.json(waiting);
});
  
app.post("/api/postres", function(req,res){
    var reservationNew = req.body;
    reservationNew.routeName = reservationNew.name.replace(/\s+/g, "").toLowerCase();
    console.log(reservationNew);
    if(reservation.length <= 4){
        reservation.push(reservationNew);
        res.json(reservationNew);
    }else{
        waiting.push(reservationNew);
        res.json(reservationNew);
    };
})
//App Listener
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });