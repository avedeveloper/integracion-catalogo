export default function (err, req, res, next) {
    console.error(err.stack,"error");
    res.status(500).send({error: "Something went wrong", message: err});
}