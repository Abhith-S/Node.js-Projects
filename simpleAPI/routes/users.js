const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Users home");
});

router.get("/api", (req, res) => {
  res.send("Users api");
});

router.get("/abhi", (req, res) => {
  res.send("User Abhi");
});


//dynamic routes

// router.get("/:id",(req,res)=>{
//     res.send(`user with ID ${req.params.id}`)
// })
// router.put("/:id",(req,res)=>{
//     res.send(`user with ID ${req.params.id}`)
// })
// router.delete("/:id",(req,res)=>{
//     res.send(`user with ID ${req.params.id}`)
// })

//OR

router
  .route("/:id")
  .get((req, res) => {
    res.send(`user with ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`user with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`user with ID ${req.params.id}`);
  });

module.exports = router;
