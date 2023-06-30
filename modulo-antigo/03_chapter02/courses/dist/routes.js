"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCourse(request, response) {
    CreateCourseService_1.default.execute({
        name: 'NodeJs',
        educator: 'José',
        duration: 4,
    }); // executa o Create
    CreateCourseService_1.default.execute({
        name: 'ReactJs',
        educator: 'Maria',
    });
    return response.send();
}
exports.createCourse = createCourse;
