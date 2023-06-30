"use strict";
/*
  name - string
  duration - number
  educator - string
*/
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCourseService {
    execute({ name, duration = 8, educator }) {
        console.log(name, duration, educator);
    } // função de execute
}
exports.default = new CreateCourseService(); // new não precisa instanciar
