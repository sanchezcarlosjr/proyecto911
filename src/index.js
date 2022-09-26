import app from "./app";
import { port } from "./config";

app.listen(port, () => console.log(`Test app listening on port ${port}!`));
