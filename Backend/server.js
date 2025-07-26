

const express = require('express');

const app = require('./app');

PORT = 3000;

const server = app.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
    console.log("http://localhost:"+PORT);
})





